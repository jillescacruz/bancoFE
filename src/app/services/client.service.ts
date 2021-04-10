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
    console.log("TOTAL AMOUNT: "+totalAmount);
    this.totalAmount.next(totalAmount);  
  }

  getActualTotalAmount():Observable<number>{
    return this.totalAmount.asObservable();  
  }

  getUserData(id:string): Observable<ResponseUserData>{
    const URL = environment.getUserDataFromRut+id;
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    console.log('llamando a getUserData');
    return this.http.get<ResponseUserData>(URL, {headers});
  }

  getUserDataFromEmail(email:string): Observable<ResponseUserData>{
    const URL = environment.getUserDataFromEmail+email;
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    console.log('llamando a getUserData');
    return this.http.get<ResponseUserData>(URL, {headers});
  }

  getDestinataries(id:string): Observable<ResponseDestinataries>{
    const URL = environment.getDestinataries+id;
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    console.log('llamando a getDestinataries');
    return this.http.get<ResponseDestinataries>(URL, {headers});
  }

  addDestinatary(destinatary:Destinatary):Observable<Response>{
    const URL = environment.addDestinatary;
    const headers = new HttpHeaders();

    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');

    return this.http.post<Response>(URL, destinatary, {headers});
  }
}
