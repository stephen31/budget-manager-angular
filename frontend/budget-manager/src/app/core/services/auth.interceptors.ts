import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const regExpUrlNotCapturedLogin = new RegExp('\/login');
    const regExpUrlNotCapturedRegister = new RegExp('\/register');
    console.log(req.url.search(regExpUrlNotCapturedLogin));
    if ((req.url.search(regExpUrlNotCapturedLogin) >= 0) || (req.url.search(regExpUrlNotCapturedRegister) >= 0)) {
      return next.handle(req);
    }
    const xsrfToken = this.authService.getXsrfToken();
    const headers = req.headers
      .set('x-xsrf-token', xsrfToken);
    const authReq = req.clone({ headers });
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
          if ((err.status === 400) || (err.status === 401)) {
            this.router.navigate(['/login']);
              return Observable.throw(err);
          }
      }));
    }
  }
