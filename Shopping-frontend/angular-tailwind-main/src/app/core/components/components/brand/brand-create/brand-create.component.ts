import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BrandService} from "../../../services/brand/brand.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-brand-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './brand-create.component.html',
  styleUrl: './brand-create.component.scss'
})
export class BrandCreateComponent {
  submissionSuccessCreate = false;
  submissionError = false;
  private brandService = inject(BrandService)
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)
  constructor() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[ a-zA-Z]+$/)]],
      description: [''],
      image:['']
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

    this.brandService.create(this.formGroup.value).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/brand/brand/list'], {
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


