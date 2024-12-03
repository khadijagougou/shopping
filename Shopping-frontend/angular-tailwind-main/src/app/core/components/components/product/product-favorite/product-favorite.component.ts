import {Component, inject} from '@angular/core';
import {ProductService} from "../../../services/product/product.service";
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-favorite',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './product-favorite.component.html',
  styleUrl: './product-favorite.component.scss'
})
export class ProductFavoriteComponent {
private productService = inject(ProductService)
  favoritesProduct:any
  ngOnInit(){
  this.favoriteProducts()
  }
  favoriteProducts(){
  this.productService.favoriteProducts().subscribe({
    next:value => {
      console.log(value)
    this.favoritesProduct=value
    },error:err => console.log(err)
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

}
