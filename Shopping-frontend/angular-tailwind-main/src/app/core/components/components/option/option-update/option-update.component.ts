import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {OptionService} from "../../../services/option/option.service";
import {AttributeService} from "../../../services/attribute/attribute.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-option-update',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './option-update.component.html',
  styleUrl: './option-update.component.scss'
})
export class OptionUpdateComponent {

  formGroup: FormGroup
  data: any
  submissionSuccessUpdate = false;
  submissionError = false;
  private optionService= inject(OptionService)
  private attributeService = inject(AttributeService)
  private fb = inject(FormBuilder)
  private route = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  attributes: any
  constructor() {
    this.formGroup=this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[ a-zA-Z]+$/)]],
      description: [''],
      attribute:['',Validators.required]
    })
    this.getAttributes()
  }

  getAttributes() {
    this.attributeService.findAll().subscribe({
      next: (value) => {
        this.attributes = value;
      },
      error: (err) => console.log('Pas d\'attributs', err)
    });
  }

  findById(id: number) {
    this.optionService.findById(id).subscribe({
      next: (value) => {
        this.data = value;
        console.log('data:',this.data);
        if (this.attributes) {
          console.log('attributes:',this.attributes)
          const matchingAttribute = this.attributes.find((attr: any) => attr.id === value.attribute?.id);
          this.formGroup.patchValue({
            name: value.name || '',
            description: value.description || '',
            attribute: matchingAttribute || ''
          });
        }
      },
      error: (err) => console.log(err)
    });
  }

  update() {
    this.submissionSuccessUpdate = false;
    this.submissionError = false;
    const updatedOption = {
      ...this.formGroup.value,
      id: this.data.id
    };
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.submissionError = true;
      return;
    }
    this.optionService.update(updatedOption).subscribe({
      next: (value) => {
        console.log(value);
        this.route.navigate(['/option/option/list'], {
          queryParams: { successupdate: 'true' },
        });
      },
      error: (err) => console.log(err)
    });
  }
  ngOnInit(){
    var id = this.activatedRoute.snapshot.params['id'];
    this.findById(id)

  }
}


