import {Component, inject} from '@angular/core';
import {AttributeService} from "../../../services/attribute/attribute.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OptionService} from "../../../services/option/option.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-option-create',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './option-create.component.html',
  styleUrl: './option-create.component.scss'
})
export class OptionCreateComponent {
  formGroup: FormGroup
  submissionSuccessCreate = false;
  submissionError = false;
  private optionService= inject(OptionService)
  private attributeService = inject(AttributeService)
  private fb = inject(FormBuilder)
  private route = inject(Router)
  attributes: any
  constructor() {
    this.formGroup=this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[ a-zA-Z]+$/)]],
      description: [''],
      attribute:['',Validators.required]
    })
    this.getAttributes()
  }
  create() {
    this.submissionSuccessCreate = false;
    this.submissionError = false;

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.submissionError = true;
      return;
    }

    this.optionService.create(this.formGroup.value).subscribe({
      next: (value) => {
        console.log(value);
        this.route.navigate(['/option/option/list'], {
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

  getAttributes(){
    this.attributeService.findAll().subscribe({
      next:value =>
      {
        console.log(value)
        this.attributes=value
      },
      error:err => console.log('pas d\'attributs')
    })
  }
}

