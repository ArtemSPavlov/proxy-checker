import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UsersAdministrationService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.apiUrl = this.configService.getConfig().server;
  }

  getUsersList(){
    return this.http.get(
      this.apiUrl + 'user/list',
      {responseType: 'json'}
    );
  }
}
