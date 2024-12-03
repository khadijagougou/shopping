import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TeamDto} from "../../components/dtos";
const BASIC_URL = "http://localhost:9092"
const URL = "/api/user"
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http : HttpClient) { }
  create(team : any): Observable<any>{
    return this.http.post(BASIC_URL + URL,team);
  }
  findAll():Observable<any>{
    return this.http.get(BASIC_URL + URL);
  }
  findById(id: number) {
    return this.http.get<TeamDto>(BASIC_URL + URL + `/id/${id}`)
  }
  update(teamDto:TeamDto){
    return this.http.put(BASIC_URL+URL,teamDto)
  }
  deleteById(id : number){
    return this.http.delete<number>(BASIC_URL + URL + `/id/${id}`)
  }
  updateStatusById(id:number):Observable<any>{
    return this.http.put(BASIC_URL+URL +`/update/status/${id}`,{});
  }
}
