import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('token');
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    if (req.body instanceof FormData) {

    } else {
        req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    }
   
 
    return next.handle(req)
        .pipe(
           catchError((error: HttpErrorResponse) => {
                //401 UNAUTHORIZED - SECTION 2
                if (error && error.status === 401) {
                    
                }
                const err = error.error.message || error.statusText;
                return throwError(error);                    
           })
        );
  }//Eo intercept()

}//Eo class
