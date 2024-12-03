import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AttributeDto} from "../../components/dtos";

const BASIC_URL = "http://localhost:9092"
const URL = "/api/attribute"

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private http: HttpClient) {
  }

  create(attribute: any): Observable<any> {
    return this.http.post(BASIC_URL + URL, attribute);
  }

  findAll(): Observable<any> {
    return this.http.get(BASIC_URL + URL);
  }

  findById(id: number) {
    return this.http.get<AttributeDto>(BASIC_URL + URL + `/id/${id}`)
  }
  update(attribute:AttributeDto){
    return this.http.put(BASIC_URL+URL,attribute)
  }
   deleteById(id : number){
    return this.http.delete<number>(BASIC_URL + URL + `/id/${id}`)
  }
}

