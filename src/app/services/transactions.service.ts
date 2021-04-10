import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseHistoricalMovement } from '../models/ResponseHistoricalMovement';
import { ResponseTransfer } from '../models/ResponseTransfer';
import { Transfer } from '../models/Transfer';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }


  transferMoney(transfer:Transfer):Observable<ResponseTransfer>{
    const URL = "https://us-central1-bancoripleypoc.cloudfunctions.net/app/movements/transfer/";
    const headers = new HttpHeaders();

    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');

    return this.http.post<ResponseTransfer>(URL, transfer, {headers});
  }

  getHistoricalMovements(id:string): Observable<ResponseHistoricalMovement>{
    const URL = 'https://us-central1-bancoripleypoc.cloudfunctions.net/app/movements/get/history/'+id;
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    console.log('llamando a getDestinataries');
    return this.http.get<ResponseHistoricalMovement>(URL, {headers});
  }


}
