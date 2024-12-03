import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BrandService} from "../../../services/brand/brand.service";
import {BrandDto, CategoryDto} from "../../dtos";
import {CategoryService} from "../../../services/category/category.service";
import {connect} from "rxjs";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-category-update',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.scss'
})
export class CategoryUpdateComponent {

  submissionSuccessUpdate = false;
  submissionError = false;
  data: any
  image: string | undefined
  private activatedRoute = inject(ActivatedRoute)

  private categoryService = inject(CategoryService)
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
    this.categoryService.findById(id).subscribe({
      next: (value: CategoryDto) => {
        console.log(value);
        this.data = value;
        this.image = value.image || '';
        console.log(this.image);
        if (value) {
          this.formGroup.patchValue({
            name: value.name || '',
            description: value.description || '',
            id: value.id || ''
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
    this.categoryService.update(updatedCategory).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/category/category/list'], {
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


