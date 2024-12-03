import {Component, inject} from '@angular/core';
import {AttributeService} from "../../../services/attribute/attribute.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SourcingService} from "../../../services/sourcing/sourcing.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sourcing-create',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './sourcing-create.component.html',
  styleUrl: './sourcing-create.component.scss'
})
export class SourcingCreateComponent {

  submissionSuccessCreate = false;
  submissionError = false;
  private sourcingService = inject(SourcingService)
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)
//kanbuildiw un form groupe
  constructor() {
    this.formGroup = this.formBuilder.group({
      product: ['', [Validators.required, Validators.pattern(/^[ a-zA-Z]+$/)]],
      description: [''],
      demande: ['',Validators.required],
      price: ['', Validators.pattern(/^\d+$/)],
      image: [''],
      url: ['',  Validators.pattern(/^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:\d+)?(\/[^\s]*)?(\?[^\s]*)?(#[^\s]*)?$/)],


    });
    console.log('aaaaa')
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
  create() {
    this.submissionSuccessCreate = false;
    this.submissionError = false;

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.submissionError = true;
      return;
    }

    this.sourcingService.create(this.formGroup.value).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/sourcing/sourcing/list'], {
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


}



