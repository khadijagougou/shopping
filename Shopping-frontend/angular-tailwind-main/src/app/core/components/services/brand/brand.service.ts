import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AttributeDto, BrandDto} from "../../components/dtos";
const BASIC_URL = "http://localhost:9092"
const URL = "/api/brand"
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http : HttpClient) { }
  create(brand : any): Observable<any>{
    return this.http.post(BASIC_URL + URL,brand);
  }
  findAll():Observable<any>{
    return this.http.get(BASIC_URL + URL);
  }
  findById(id: number) {
    return this.http.get<BrandDto>(BASIC_URL + URL + `/id/${id}`)
  }
  update(brandDto:BrandDto){
    return this.http.put(BASIC_URL+URL,brandDto)
  }
  deleteById(id : number){
    return this.http.delete<number>(BASIC_URL + URL + `/id/${id}`)
  }
}
