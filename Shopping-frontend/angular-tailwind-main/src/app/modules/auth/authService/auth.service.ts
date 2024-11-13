import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const BASIC_URL = "http://localhost:9092"
const AUTH = "/api/auth"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  signup(userDto : any):Observable<any>{
    return this.http.post(BASIC_URL+AUTH+`/signup`,userDto)
  }



}
