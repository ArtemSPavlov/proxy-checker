import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private token;

    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = localStorage.getItem(this.authService.getTokenKey());

        if(req.url === (this.configService.getConfig + 'user/registration')) {
            console.log("From interceptor: ", req);
            return next.handle(req);
        }

        if(this.token){
            req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.token}`
                }
              });
        }

        return next.handle(req);
    }
}
