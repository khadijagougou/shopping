import {ChangeDetectionStrategy, Component, inject, TemplateRef} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {NgClass, NgForOf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCoffee, faStar} from '@fortawesome/free-solid-svg-icons';

import {
  DialogOverviewExampleDialogComponent
} from "./dialog-overview-example-dialog/dialog-overview-example-dialog.component";
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {CategoryService} from "../../services/category/category.service";
import {BrandService} from "../../services/brand/brand.service";
import {
  NftAuctionsTableItemComponent
} from "../../../../modules/dashboard/components/nft/nft-auctions-table-item/nft-auctions-table-item.component";
import {AngularSvgIconModule} from "angular-svg-icon";
import {NgApexchartsModule} from "ng-apexcharts";
import {ProductDto} from "../dtos";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    DialogOverviewExampleDialogComponent,
    NftAuctionsTableItemComponent,
    AngularSvgIconModule,
    NgApexchartsModule,
    FontAwesomeModule,
    NgForOf,
    FormsModule

  ],

  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss'
})
export class MarketplaceComponent {

  private productService = inject(ProductService)
  private categoryService = inject(CategoryService)
  private brandService = inject(BrandService)
  brands: any
  categories: any
  products: any

  ngOnInit() {
    this.findAll()
    this.getAllBrands()
    this.getAllCategories()


  }

  getAllBrands() {
    this.brandService.findAll().subscribe({
      next: value => {
        console.log(value)
        this.brands = value
      },
      error: err => console.log(err)
    })
  }

  getAllCategories() {
    this.categoryService.findAll().subscribe({
      next: value => {
        console.log(value)
        this.categories = value
      },
      error: err => console.log(err)
    })
  }

  findAll() {
    this.productService.findAll().subscribe({
      next: value => {
        console.log(value)
        this.products = value
        this.products = value.map((product: any) => ({
          ...product,
          rating: this.mapRatingStringToNumber(product.rating)

        }));
        console.log("produit", this.products)
      },
      error: err => console.log('pas de products')
    })
  }


  toggleFavorite(product: any): void {
    this.productService.updateFavorisById(product.id).subscribe({
      next: (updatedProduct) => {
        product.favoris = updatedProduct.favoris;
      },
      error: (err) => console.error(err)
    });
  }


  toggleCart(product: any): void {
    this.productService.updateCartById(product.id).subscribe({
      next: (updatedProduct) => {
        product.cart = updatedProduct.cart;

      },
      error: (err) => console.error(err)
    });
  }

  modalRef: BsModalRef | undefined;

  constructor(private modalService: BsModalService) {
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  selectedBrands: number[] = [];
  selectedCategories: number[] = [];


  onBrandChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedBrands.push(Number(checkbox.value));
    } else {
      const index = this.selectedBrands.indexOf(Number(checkbox.value));
      if (index > -1) {
        this.selectedBrands.splice(index, 1);
      }
    }
  }

  onCategoryChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedCategories.push(Number(checkbox.value));
    } else {
      const index = this.selectedCategories.indexOf(Number(checkbox.value));
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
  }


  noProduct: any
  minPrice: any
  maxPrice :any

  onApplyFilter() {
    console.log("brandsss", this.selectedBrands)
    console.log("categories", this.selectedCategories)
    console.log("rating", this.rating)
    console.log("min", this.minPrice)
    console.log("max", this.maxPrice)
    this.productService.getFilteredProducts(
      this.selectedBrands,
      this.selectedCategories,
      this.rating,
      this.minPrice,
      this.maxPrice
    ).subscribe({
      next: (data) => {
        if (!data || data.length === 0) {
          console.log(data);
          this.noProduct = 'No products match your search criteria!';
          this.products = [];
          this.products
        } else {
          this.products = data.map((product: any) => ({
            ...product,
            rating: this.mapRatingStringToNumber(product.rating)

          }));


          this.noProduct = '';
          console.log('Produits filtrés appliqués:', this.products);
        }
        this.modalRef?.hide()
      },
      error: (err) => console.error('Erreur lors de l’application des filtres:', err)
    });
  }


  clearFilters() {
    this.noProduct = ''
    this.selectedCategories = []
    this.selectedBrands = []
    this.minPrice = 0
    this.maxPrice = 0
    this.rating = []
    this.onApplyFilter();
  }

  rateProduct(rating: number, productId: number): void {
    const product = this.products.find((p: any) => p.id === productId);
    if (product) {
      if (product.rating === rating) {
        product.rating = 0;
      } else {
        product.rating = rating;
      }
      this.productService.updateRating(product.rating, productId).subscribe({
        next: (updatedProduct) => {
          console.log('Produit mis à jour :', updatedProduct);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du rating :', err);
        }
      });

    }
  }


  private mapRatingStringToNumber(rating: string): number {
    const ratingMap: { [key: string]: number } = {
      ZERO: 0,
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5
    };
    return ratingMap[rating] ?? 0;
  }


  faCoffee = faCoffee;

  protected readonly faStar = faStar;
  rating: number[] = []

  onStarToggle(star: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      // Ajoute la valeur au tableau si elle est cochée
      this.rating.push(star);
    } else {
      // Retire la valeur du tableau si elle est décochée
      this.rating = this.rating.filter((r) => r !== star);
    }

    console.log('Rating sélectionné :', this.rating);
  }

}
