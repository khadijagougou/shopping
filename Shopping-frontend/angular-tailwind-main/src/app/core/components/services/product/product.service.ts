import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AttributeDto, ProductDto} from "../../components/dtos";
import {list} from "postcss";
const BASIC_URL = "http://localhost:9092"
const URL = "/api/product"
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }
  create(product : any): Observable<any>{
    return this.http.post(BASIC_URL + URL,product);
  }
  findAll():Observable<any>{
    return this.http.get(BASIC_URL + URL);
  }
  updateFavorisById(id:number):Observable<any>{
    return this.http.put(BASIC_URL+URL +`/update/favoris/produit/${id}`,{});
  }
  favoriteProducts():Observable<any>{
    return this.http.get(BASIC_URL+URL+'/favoris/true');
  }
  updateCartById(id:number):Observable<any>{
    return this.http.put(BASIC_URL+URL +`/update/cart/produit/${id}`,{});
  }
  productsAddedToCart():Observable<any>{
    return this.http.get(BASIC_URL+URL+'/cart/true');
  }

  getFilteredProducts(
    brandIds?: number[],
    categoryIds?: number[],
    rating?: number[],
    minPrice?: number,
    maxPrice?: number
  ): Observable<any> {
    let params = new HttpParams();

    if (brandIds) {
      params = params.append('brandIds', brandIds.join(','));
    }
    if (categoryIds) {
      params = params.append('categoryIds', categoryIds.join(','));
    }if (Array.isArray(rating) && rating.length > 0) {
      const ratingStrings = rating.map((r: number) => this.mapNumberToRatingString(r));
      params = params.append('rating', ratingStrings.join(','));
    }

    if (minPrice !== undefined) {
      params = params.append('minPrice', minPrice.toString());
    }
    if (maxPrice !== undefined) {
      params = params.append('maxPrice', maxPrice.toString());
    }

    return this.http.get<Array<ProductDto>>(BASIC_URL + URL + '/products', { params });
  }
  findById(id: number) {
    return this.http.get<ProductDto>(BASIC_URL + URL + `/id/${id}`)
  }
  update(productDto:ProductDto){
    return this.http.put(BASIC_URL+URL,productDto)
  }
  deleteById(id : number){
    return this.http.delete<number>(BASIC_URL + URL + `/id/${id}`)
  }
  updateRating(rating:number,id:number):Observable<any>{
    return  this.http.put(BASIC_URL+URL+`/rating/${rating}/id/${id}`,{})
  }
  private mapNumberToRatingString(rating: number): string {
    const ratingMap: { [key: number]: string } = {
      0: 'ZERO',
      1: 'ONE',
      2: 'TWO',
      3: 'THREE',
      4: 'FOUR',
      5: 'FIVE',
    };
    return ratingMap[rating] ?? 'ZERO';
  }
}
