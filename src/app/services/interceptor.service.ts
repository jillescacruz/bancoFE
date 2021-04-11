import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token')!;  
    let request = req;
    if(req.url.toString() != environment.bankList){
      if (token) {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${token}`,
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });
      }
   }
    return next.handle(request);
  }
}
