import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category/category.service";
import {CategoryDto, SourcingDto} from "../../dtos";
import {SourcingService} from "../../../services/sourcing/sourcing.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sourcing-update',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './sourcing-update.component.html',
  styleUrl: './sourcing-update.component.scss'
})
export class SourcingUpdateComponent {

  submissionSuccessUpdate = false;
  submissionError = false;
  data: any
  image: string | undefined
  private activatedRoute = inject(ActivatedRoute)

  private sourcingService = inject(SourcingService)
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)

  constructor() {
    this.formGroup = this.formBuilder.group({
      product: ['', [Validators.required, Validators.pattern(/^[ a-zA-Z]+$/)]],
      description: [''],
      demande: ['',Validators.required],
      price: ['', Validators.pattern(/^\d+$/)],
      image: [''],
      url: ['',  Validators.pattern(/^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:\d+)?(\/[^\s]*)?(\?[^\s]*)?(#[^\s]*)?$/)],

    });
  }


  findById(id: number) {
    this.sourcingService.findById(id).subscribe({
      next: (value: SourcingDto) => {
        console.log(value);
        this.data = value;
        this.image = value.image
        if (value) {
          this.formGroup.patchValue({
            product: value.product || '',
            description: value.description || '',
            id: value.id || '',
            demande: value.demande || '',
            price: value.price ||'',
            url:value.url||''
          });
          this.image = value.image || '';

        }
      },
      error: (err) => console.log("Erreur lors de la récupération de l'attribut", err),
    });
  }

  saveWithImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);

      reader.onload = () => {
        this.formGroup.value.image = reader.result?.toString().split(',')[1];
        this.update();
      }
    } else {
      this.update();
    }
  }

  selectedFile: File | null = null;

  /*onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
*/
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Prévisualiser l'image
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
    const updatedSourcing = {
      ...this.formGroup.value,
      id: this.data.id // Ensure the id is part of the request payload
    };
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.submissionError = true;
      return;
    }
    this.sourcingService.update(updatedSourcing).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/sourcing/sourcing/list'], {
          queryParams: { successupdate: 'true' },
        });
      },
      error: (err) => console.log(err)
    });
  }

  ngOnInit() {
    var param = this.activatedRoute.snapshot.params['id'];
    this.findById(param)
  }

}




