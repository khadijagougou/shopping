import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AttributeService} from "../../../services/attribute/attribute.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AttributeDto} from "../../dtos";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-attribute-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './attribute-update.component.html',
  styleUrl: './attribute-update.component.scss'
})
export class AttributeUpdateComponent {

  submissionSuccessUpdate = false;
  submissionError = false;
  data: any
  private attributeService = inject(AttributeService)
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  ngOnInit() {
    var param = this.activatedRoute.snapshot.params['id'];
    this.findById(param)
  }

  constructor() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[ a-zA-Z]+$/)]],
      description: [''],
      type: ['', Validators.required],
      orderNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Validation pour accepter uniquement des nombres
    });

  }

  findById(id: number) {
    this.attributeService.findById(id).subscribe({
      next: (value:AttributeDto) => {
        console.log(value);
        this.data = value;

        if (value) {
          this.formGroup.patchValue({
            name: value.name || '',
            description: value.description || '',
            orderNumber: value.orderNumber || '',
            type: value.type || '',
            id:value.id ||'',
          });
        }
      },
      error: (err) => console.log("Erreur lors de la récupération de l'attribut", err),
    });
  }


  update() {
    this.submissionSuccessUpdate = false;
    this.submissionError = false;
    const updatedAttribute = {
      ...this.formGroup.value,
      id: this.data.id
    };
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.submissionError = true;
      return;
    }

    this.attributeService.update(updatedAttribute).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/attribute/attribute/list'], {
          queryParams: { successupdate: 'true' },
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




