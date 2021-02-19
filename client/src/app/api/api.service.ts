import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ValidateUserDto } from '../dto/validate-user.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.apiUrl = this.configService.getConfig().server;
  }

  getUser(): Observable<any>{
    return this.http.get(
      this.apiUrl + 'user',
      {responseType: 'json'}
    ).pipe(
      catchError(err => {
        console.log("From http: ", err);
        return throwError(err);
    })
    )
  }

  getProxies(): Observable<any>{
    return this.http.get(
      this.apiUrl + 'proxy',
      {responseType: 'text'}
    ).pipe(
      catchError(err => {
        console.log("From http: ", err);
        return throwError(err);
    })
    )
  }

  loginUser(requestData: ValidateUserDto){
    return this.http.post(
      this.apiUrl + "user/sing-in",
      requestData,
      {responseType: 'text'}
    );
  }


  registration(requestData: CreateUserDto){
    console.log("Data: ", requestData);
    return this.http.post(
      this.apiUrl + "user/registration",
      requestData,
      {responseType: 'text'}
    );
  }
}
