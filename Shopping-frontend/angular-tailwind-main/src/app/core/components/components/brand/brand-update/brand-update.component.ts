import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BrandService} from "../../../services/brand/brand.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AttributeDto, BrandDto} from "../../dtos";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-brand-update',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './brand-update.component.html',
  styleUrl: './brand-update.component.scss'
})
export class BrandUpdateComponent {

  submissionSuccessUpdate = false;
  submissionError = false;
  data: any
  image: string | undefined
  private activatedRoute = inject(ActivatedRoute)

  private brandService = inject(BrandService)
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)

  constructor() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[ a-zA-Z]+$/)]],
      description: [''],
      image: ['']
    });
  }


  findById(id: number) {
    this.brandService.findById(id).subscribe({
      next: (value: BrandDto) => {
        console.log(value);
        this.data = value;
        this.image = value.image
        if (value) {
          this.formGroup.patchValue({
            name: value.name || '',
            description: value.description || '',
            id: value.id || '',
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
    const updatedBrand = {
      ...this.formGroup.value,
      id: this.data.id // Ensure the id is part of the request payload
    };

    this.brandService.update(updatedBrand).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/brand/brand/list'],{
          queryParams: { successupdate: 'true' },

        });
      },
      error: (err) =>{
        console.log(err)
        this.submissionError = true;

      }    });
  }

  ngOnInit() {
    var param = this.activatedRoute.snapshot.params['id'];
    this.findById(param)
  }

}



