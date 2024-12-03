import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/category/category.service";
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product/product.service";
import {OptionService} from "../../../services/option/option.service";
import {BrandService} from "../../../services/brand/brand.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-product-create',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  submissionSuccessCreate = false;
  submissionError = false;
  private productService = inject(ProductService)
  private optionService = inject(OptionService)
  private categoryService = inject(CategoryService)
  private brandService = inject(BrandService)
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)
  options :any
  categories:any
  brands: any
//kanbuildiw un form groupe
  constructor() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[ a-zA-Z]+$/)]],
      description: [''],
      sku: [''],
      shortDescription: [''],
      price: ['', Validators.pattern(/^\d+$/)],
      comparePrice: ['', Validators.pattern(/^\d+$/)],
      affiliatePrice: ['', Validators.pattern(/^\d+$/)],
      recommendedPrice: ['', Validators.pattern(/^\d+$/)],
      option: ['',Validators.required],
      category: ['',Validators.required],
      brand: ['',Validators.required],
      image:[''],
      createdDate: [null]
    });
    this.getAllOptions()
    this.getAllBrands()
    this.getAllCategories()
  }

  create() {
    this.submissionSuccessCreate = false;
    this.submissionError = false;

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.submissionError = true;
      return;
    }
    this.formGroup.patchValue({
      createdDate: new Date().toISOString()  // Date actuelle au format ISO
    });
    this.productService.create(this.formGroup.value).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/product/product/list'], {
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
  getAllOptions(){
    this.optionService.findAll().subscribe({
      next:value => {
        console.log(value);
        this.options=value
      },error:err => console.log('no options founded')
    })
  }
  getAllCategories(){
    this.categoryService.findAll().subscribe({
      next:value => {
        console.log(value);
        this.categories=value
      },error:err => console.log('no categories founded')
    })
  }
  getAllBrands(){
    this.brandService.findAll().subscribe({
      next:value => {
        console.log(value);
        this.brands=value
      },error:err => console.log('no brands founded')
    })
  }
}

