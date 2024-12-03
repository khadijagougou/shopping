import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {OptionDto} from "../../components/dtos";
const BASIC_URL = "http://localhost:9092"
const URL = "/api/option"
@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor(private http : HttpClient) { }
  create(option : any): Observable<any>{
    return this.http.post(BASIC_URL + URL,option);
  }
  findAll():Observable<any>{
    return this.http.get(BASIC_URL + URL);
  }
  findById(id:number){
    return this.http.get<OptionDto>(BASIC_URL+URL+`/id/${id}`)
  }
  update(optionDto:OptionDto){
    return this.http.put<OptionDto>(BASIC_URL+URL,optionDto)
  }
  deleteById(id : number){
    return this.http.delete<number>(BASIC_URL + URL + `/id/${id}`)
  }
}
