import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TeamService} from "../../../services/team/team.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-team-create',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './team-create.component.html',
  styleUrl: './team-create.component.scss'
})
export class TeamCreateComponent {

  submissionSuccessCreate = false;
  submissionError = false;
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
      image:[''],
      createdDate: [null]

    });
  }

  create() {
    this.submissionSuccessCreate = false;
    this.submissionError = false;

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.submissionError = true;
      return;
    }
    this.formGroup.patchValue({
      createdDate: new Date().toISOString()  // Date actuelle au format ISO
    });
    this.teamService.create(this.formGroup.value).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/team/team/list'], {
          queryParams: { successcreate: 'true' },
        });
      },
      error: (err) => {
        console.error('Création échouée', err);
        this.submissionError = true;
        if (err.error && err.error.message) {
          alert(`Error: ${err.error.message}`);
        }
      },
    });
  }

  saveWithImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);

      reader.onload = () => {
        this.formGroup.value.image =reader.result?.toString().split(',')[1];
        this.create();
      }}
    else
    {
      this.create();
    }
  }
  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}



