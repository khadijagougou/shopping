import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category/category.service";
import {CategoryDto, TeamDto} from "../../dtos";
import {TeamService} from "../../../services/team/team.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-team-update',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './team-update.component.html',
  styleUrl: './team-update.component.scss'
})
export class TeamUpdateComponent {

  submissionSuccessUpdate = false;
  submissionError = false;
  data: any
  image: string | undefined
  private activatedRoute = inject(ActivatedRoute)

  private teamService = inject(TeamService)
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)

  constructor() {
    this.formGroup = this.formBuilder.group({
      firstname: ['',Validators.required,Validators.pattern(/^[ a-zA-Z]+$/)],
      lastname: ['',Validators.required,Validators.pattern(/^[ a-zA-Z]+$/)],
      phone: ['', Validators.pattern(/^\d{10}$/)],
      email: ['', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      name: [''],
      adress: [''],
      password: ['',Validators.required],
      image:['']
    });
  }


  findById(id: number) {
    this.teamService.findById(id).subscribe({
      next: (value: TeamDto) => {
        console.log(value);
        this.data = value;
        this.image = value.image || '';
        console.log(this.image);
        if (value) {
          this.formGroup.patchValue({
            id: value.id || '',
            firstname: value.firstname || '',
            lastname: value.lastname || '',
            phone: value.phone || '',
            email: value.email || '',
            name: value.name || '',
            adress: value.adress || '',
            password: value.password || '',
          });
        }
      },
      error: (err) => console.log("Erreur lors de la récupération des données", err),
    });
  }

  saveWithImage() {
    // If a new file is selected, read it and update the image
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);

      reader.onload = () => {
        // Update the image field with the base64 image data
        this.formGroup.value.image = reader.result?.toString().split(',')[1];
        this.update();
      };
    } else {
      // If no file is selected, send the existing image (no modification)
      this.formGroup.value.image = this.image;
      console.log(this.image)
      this.update();
    }
  }
  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  update() {
    this.submissionSuccessUpdate = false;
    this.submissionError = false;
    const updatedTeam = {
      ...this.formGroup.value,
      id: this.data.id
    };
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.submissionError = true;
      return;
    }
    this.teamService.update(updatedTeam).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/team/team/list'], {
          queryParams: { successupdate: 'true' },
        });
      },
      error: (err) => console.log(err)
    });
  }

  ngOnInit() {
    const param = this.activatedRoute.snapshot.params['id'];
    this.findById(param);

  }

}



