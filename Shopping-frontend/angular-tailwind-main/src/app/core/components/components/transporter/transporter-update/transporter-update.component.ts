import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TransporterService} from "../../../services/transporter/transporter.service";
import {TransporterDto} from "../../dtos";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-transporter-update',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './transporter-update.component.html',
  styleUrl: './transporter-update.component.scss'
})
export class TransporterUpdateComponent {


  data: any
  image: string | undefined
  private activatedRoute = inject(ActivatedRoute)
  submissionSuccessUpdate = false;
  submissionError = false;
  private transporterService = inject(TransporterService)
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)

  constructor() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[ a-zA-Z]+$/)]],
      rc: ['', [Validators.pattern('^[a-zA-Z0-9]+$')]],
      ice: ['', [Validators.pattern('^[a-zA-Z0-9]+$')]],
      phone: ['', Validators.pattern(/^\d{10}$/)],
      email: ['', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      website: ['',  Validators.pattern(/^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:\d+)?(\/[^\s]*)?(\?[^\s]*)?(#[^\s]*)?$/)],
      capital: ['',  Validators.pattern(/^[ a-zA-Z]+$/)],
      adress: [''],
      image:['']
    });
  }
  public imageUrl!: string;  // L'URL de l'image qui est récupérée lors de l'édition
  public imagePreview: string | ArrayBuffer | null = null;

  findById(id: number) {
    this.transporterService.findById(id).subscribe({
      next: (value: TransporterDto) => {
        console.log(value);
        this.data = value;
        this.image = value.image || '';
        console.log(this.image);
        if (value) {
          this.formGroup.patchValue({
            name: value.name || '',
            id: value.id || '',
            phone: value.phone || '',
            rc: value.rc || '',
            ice: value.ice || '',
            email: value.email || '',
            website: value.website || '',
            capital: value.capital || '',
            adress: value.adress || '',

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
    const updatedCategory = {
      ...this.formGroup.value,
      id: this.data.id // Ensure the id is part of the request payload
    };
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.submissionError = true;
      return;
    }
    this.transporterService.update(updatedCategory).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/transporter/transporter/list'], {
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



