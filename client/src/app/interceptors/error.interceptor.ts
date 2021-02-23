import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SingInService } from '../auth/sing-in/sing-in.service';
import { ErrorService } from '../error/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private singInService: SingInService,
        private errorService: ErrorService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            tap(
                event => {

                    this.singInService.setError(undefined);
                    return event;
                },
                error => {
                    if(error instanceof HttpErrorResponse && error.status >= 400) {
                        switch (error.status) {
                            case 401:
                                this.router.navigate(['auth']);
                                this.singInService.setError(error);
                                break;
                            case 404:
                                this.router.navigate(['404']);
                                break;
                            default:
                                this.errorService.setError(error);
                                this.router.navigate(['error']);
                                break;
                        }
                        return error;
                    }
                }
            )
        )
    }
}