import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Destinatary } from '../models/Destinatary';
import { ResponseDestinataries } from '../models/ResponseDestinataries';
import { ResponseUserData } from '../models/ResponseUserData';
import {environment} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private totalAmount=new Subject<number>();

  constructor(private http: HttpClient) { }

  setActualTotalAmount(totalAmount:number){
    this.totalAmount.next(totalAmount);  
  }

  getActualTotalAmount():Observable<number>{
    return this.totalAmount.asObservable();  
  }

  getUserData(id:string): Observable<ResponseUserData>{
    const URL = environment.getUserDataFromRut+id;
    const headers = new HttpHeaders();
    return this.http.get<ResponseUserData>(URL, {headers});
  }

  getUserDataFromEmail(email:string): Observable<ResponseUserData>{
    const URL = environment.getUserDataFromEmail+email;
    const headers = new HttpHeaders();
    return this.http.get<ResponseUserData>(URL, {headers});
  }

  getDestinataries(id:string): Observable<ResponseDestinataries>{
    const URL = environment.getDestinataries+id;
    const headers = new HttpHeaders();
    return this.http.get<ResponseDestinataries>(URL, {headers});
  }

  addDestinatary(destinatary:Destinatary):Observable<Response>{
    const URL = environment.addDestinatary;
    const headers = new HttpHeaders();
    return this.http.post<Response>(URL, destinatary, {headers});
  }
}
