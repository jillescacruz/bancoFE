import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseHistoricalMovement } from '../models/ResponseHistoricalMovement';
import { ResponseTransfer } from '../models/ResponseTransfer';
import { Transfer } from '../models/Transfer';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }


  transferMoney(transfer:Transfer):Observable<ResponseTransfer>{
    const URL = environment.transfer;
    const headers = new HttpHeaders();

    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');

    return this.http.post<ResponseTransfer>(URL, transfer, {headers});
  }

  getHistoricalMovements(id:string): Observable<ResponseHistoricalMovement>{
    const URL = environment.getHistory+id;
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    return this.http.get<ResponseHistoricalMovement>(URL, {headers});
  }


}
