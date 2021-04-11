import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { AccountType } from '../models/AccountType';
import { ResponseBank } from '../models/ResponseBank';

@Injectable({
  providedIn: 'root'
})
export class DefaultBanksService {

  constructor(private http: HttpClient) { }


  getAllBanks(): Observable<ResponseBank>{
    const URL = environment.bankList;
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    return this.http.get<ResponseBank>(URL, {headers});
  }

  getAccountTypes(){
     var accountTypes: AccountType[] = [
      {value: '1', viewValue: 'Cuenta Corriente'},
      {value: '2', viewValue: 'Cuenta Vista'},
      {value: '3', viewValue: 'Cuenta Ahorro'}
    ];

    return accountTypes;
  }
  
}
