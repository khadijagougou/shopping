import {Component, inject} from '@angular/core';
import {ProductService} from "../../../services/product/product.service";
import {NgClass, NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [
    NgClass,
    FaIconComponent,
    NgForOf
  ],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss'
})
export class ProductCartComponent {

  private productService = inject(ProductService)
  private router = inject(Router)

  productAddedToCart:any
  ngOnInit(){
    this.productsAddedToCart()
  }
  productsAddedToCart(){
    this.productService.productsAddedToCart().subscribe({
      next:value => {
        console.log(value)
        this.productAddedToCart=value
      },error:err => console.log(err)
    })
  }
  toggleCart(product: any): void {
    this.productService.updateCartById(product.id).subscribe({
      next: (updatedProduct) => {
        product.cart = updatedProduct.cart;

      },
      error: (err) => console.error(err)
    });
  }
  rating: number[] = []


  toggleFavorite(product: any): void {
    this.productService.updateFavorisById(product.id).subscribe({
      next: (updatedProduct) => {
        product.favoris = updatedProduct.favoris;
      },
      error: (err) => console.error(err)
    });
  }

  protected readonly faStar = faStar;
}

