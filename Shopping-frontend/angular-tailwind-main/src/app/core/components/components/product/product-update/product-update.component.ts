import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product/product.service";
import {OptionService} from "../../../services/option/option.service";
import {CategoryService} from "../../../services/category/category.service";
import {BrandService} from "../../../services/brand/brand.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-product-update',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss'
})
export class ProductUpdateComponent {
  submissionSuccessUpdate = false;
  submissionError = false;
  data: any
  image: string | undefined
  private productService = inject(ProductService)
  private optionService = inject(OptionService)
  private categoryService = inject(CategoryService)
  private brandService = inject(BrandService)
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  options: any
  categories: any
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
      option: [''],
      category: [''],
      brand: [''],
      image:['']
    });
    this.getAllOptions()
    this.getAllBrands()
    this.getAllCategories()
  }

  update() {
    this.submissionSuccessUpdate = false;
    this.submissionError = false;    const updatedBrand = {
      ...this.formGroup.value,
      id: this.data.id
    };
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.submissionError = true;
      return;
    }
    this.productService.update(updatedBrand).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/product/product/list'], {
          queryParams: { successupdate: 'true' },
        });
      },
      error: err => console.log(err)
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


  getAllOptions() {
    this.optionService.findAll().subscribe({
      next: value => {
        console.log(value);
        this.options = value
      }, error: err => console.log('no options founded')
    })
  }

  getAllCategories() {
    this.categoryService.findAll().subscribe({
      next: value => {
        console.log(value);
        this.categories = value
      }, error: err => console.log('no categories founded')
    })
  }

  getAllBrands() {
    this.brandService.findAll().subscribe({
      next: value => {
        console.log(value);
        this.brands = value
      }, error: err => console.log('no brands founded')
    })
  }
  findById(id: number) {
    this.productService.findById(id).subscribe({
      next: (value) => {
        this.data = value;
        this.image = value.image
        console.log('data:',this.data);
        if (this.options && this.brands && this.categories) {
          console.log('options:',this.options)
          console.log('brands:',this.brands)
          console.log('categories:',this.categories)

          const matchingOptions = this.options.find((op: any) => op.id === value.option?.id);
          const matchingBrands = this.brands.find((br: any) => br.id === value.brand?.id);
          const matchingCategories= this.categories.find((cat: any) => cat.id === value.category?.id);
          this.formGroup.patchValue({
            name: value.name || '',
            description: value.description || '',
            id: value.id || '',
            sku: value.sku || '',
            shortDescription: value.shortDescription || '',
            price: value.price || '',
            comparePrice: value.comparePrice || '',
            affiliatePrice: value.affiliatePrice || '',
            recommendedPrice: value.recommendedPrice || '',
            option: matchingOptions || '',
            category: matchingCategories || '',
            brand: matchingBrands || '',
          });
          this.image = value.image || '';

        }
      },
      error: (err) => console.log(err)
    });
  }
  ngOnInit(){
    var id = this.activatedRoute.snapshot.params['id'];
    this.findById(id)

  }
}


