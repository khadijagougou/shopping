import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { SourcingDto} from "../../components/dtos";
const BASIC_URL = "http://localhost:9092"
const URL = "/api/sourcing"
@Injectable({
  providedIn: 'root'
})
export class SourcingService {

  constructor(private http: HttpClient) {
  }

  create(sourcing: any): Observable<any> {
    return this.http.post(BASIC_URL + URL, sourcing);
  }

  findAll(): Observable<any> {
    return this.http.get(BASIC_URL + URL);
  }

  findById(id: number) {
    return this.http.get<SourcingDto>(BASIC_URL + URL + `/id/${id}`)
  }
  update(sourcing:SourcingDto){
    return this.http.put(BASIC_URL+URL,sourcing)
  }
  deleteById(id : number){
    return this.http.delete<number>(BASIC_URL + URL + `/id/${id}`)
  }
}

