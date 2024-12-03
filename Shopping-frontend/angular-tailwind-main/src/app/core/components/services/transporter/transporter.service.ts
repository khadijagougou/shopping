import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryDto, TransporterDto} from "../../components/dtos";
const BASIC_URL = "http://localhost:9092"
const URL = "/api/transporter"
@Injectable({
  providedIn: 'root'
})
export class TransporterService {


  constructor(private http : HttpClient) { }
  create(transporter : any): Observable<any>{
    return this.http.post(BASIC_URL + URL,transporter);
  }
  findAll():Observable<any>{
    return this.http.get(BASIC_URL + URL);
  }

  findById(id: number) {
    return this.http.get<TransporterDto>(BASIC_URL + URL + `/id/${id}`)
  }
  update(transporterDto:TransporterDto){
    return this.http.put(BASIC_URL+URL,transporterDto)
  }
  deleteById(id : number){
    return this.http.delete<number>(BASIC_URL + URL + `/id/${id}`)
  }
}

