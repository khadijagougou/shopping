import {Component, inject} from '@angular/core';

import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TransporterService} from "../../../services/transporter/transporter.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-transporter-create',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './transporter-create.component.html',
  styleUrl: './transporter-create.component.scss'
})
export class TransporterCreateComponent {

  submissionSuccessCreate = false;
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

  create() {
    this.submissionSuccessCreate = false;
    this.submissionError = false;

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.submissionError = true;
      return;
    }

    this.transporterService.create(this.formGroup.value).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/transporter/transporter/list'], {
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


