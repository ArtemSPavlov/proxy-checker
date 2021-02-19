import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { User } from '../types/user.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  apiUrl: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
    ) {
      this.apiUrl = this.configService.getConfig().server;
    }

  getUser(): Observable<any> {
    return this.http.get(
      this.apiUrl + 'user',
      {responseType: 'json'}
    );
  }
}
