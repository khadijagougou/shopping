import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AttributeDto, CategoryDto} from "../../components/dtos";
const BASIC_URL = "http://localhost:9092"
const URL = "/api/category"
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }
  create(category : any): Observable<any>{
    return this.http.post(BASIC_URL + URL,category);
  }
  findAll():Observable<any>{
    return this.http.get(BASIC_URL + URL);
  }
  findById(id: number) {
    return this.http.get<CategoryDto>(BASIC_URL + URL + `/id/${id}`)
  }
  update(categoryDto:CategoryDto){
    return this.http.put(BASIC_URL+URL,categoryDto)
  }
  deleteById(id : number){
    return this.http.delete<number>(BASIC_URL + URL + `/id/${id}`)
  }
}
