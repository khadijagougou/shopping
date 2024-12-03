import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AttributeService} from "../../../services/attribute/attribute.service";
import {AngularSvgIconModule} from "angular-svg-icon";
import {ButtonComponent} from "../../../../../shared/components/button/button.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-attribute-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AngularSvgIconModule,
    ButtonComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './attribute-create.component.html',
  styleUrl: './attribute-create.component.scss'
})
export class AttributeCreateComponent {

  submissionSuccessCreate = false;
  submissionError = false;
  private attributeService = inject(AttributeService)
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)
//kanbuildiw un form groupe
  constructor() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[ a-zA-Z]+$/)]],
      type: ['', [Validators.required]],
      description: [''],
      orderNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Validation pour accepter uniquement des nombres
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

    this.attributeService.create(this.formGroup.value).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/attribute/attribute/list'], {
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



