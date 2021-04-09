import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { ResponseBank } from '../models/ResponseBank';

@Injectable({
  providedIn: 'root'
})
export class DefaultBanksService {

  constructor(private http: HttpClient) { }


  getAllBanks(): Observable<ResponseBank>{
    const URL = 'https://bast.dev/api/banks.php';
    const headers = new HttpHeaders();
    console.log('llamando a bancos');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    return this.http.get<ResponseBank>(URL, {headers});
  }
}
