import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ForwardingAgentDto, TransporterDto} from "../../components/dtos";
const BASIC_URL = "http://localhost:9092"
const URL = "/api/forwardingAgent"
@Injectable({
  providedIn: 'root'
})
export class ForwardingAgentService {

  constructor(private http : HttpClient) { }
  create(forwardingAgent : any): Observable<any>{
    return this.http.post(BASIC_URL + URL,forwardingAgent);
  }
  findAll():Observable<any>{
    return this.http.get(BASIC_URL + URL);
  }
  findById(id: number) {
    return this.http.get<ForwardingAgentDto>(BASIC_URL + URL + `/id/${id}`)
  }
  update(forwardingAgentDto:ForwardingAgentDto){
    return this.http.put(BASIC_URL+URL,forwardingAgentDto)
  }
  deleteById(id : number){
    return this.http.delete<number>(BASIC_URL + URL + `/id/${id}`)
  }
}
