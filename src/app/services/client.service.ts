import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Destinatary } from '../models/Destinatary';
import { ResponseDestinataries } from '../models/ResponseDestinataries';
import { ResponseUserData } from '../models/ResponseUserData';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getUserData(id:string): Observable<ResponseUserData>{
    const URL = 'http://localhost:5000/bancoripleypoc/us-central1/app/clients/get/15840395';
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    console.log('llamando a getUserData');
    return this.http.get<ResponseUserData>(URL, {headers});
  }

  getDestinataries(id:string): Observable<ResponseDestinataries>{
    const URL = 'http://localhost:5000/bancoripleypoc/us-central1/app/clients/get/destinatary/15840395';
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    console.log('llamando a getDestinataries');
    return this.http.get<ResponseDestinataries>(URL, {headers});
  }

  addDestinatary(destinatary:Destinatary):Observable<Response>{
    const URL = "http://localhost:5000/bancoripleypoc/us-central1/app/clients/add/destinatary";
    const headers = new HttpHeaders();

    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');

    return this.http.post<Response>(URL, destinatary, {headers});
  }
}
