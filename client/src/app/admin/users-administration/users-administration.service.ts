import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/config/config.service';
import { User } from 'src/app/types/user.type';

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

  getUsersList(): Observable<User>{
    return this.http.get(
      this.apiUrl + 'user/list',
      {responseType: 'json'}
    ) as Observable<User>;
  }

  changeUserStatus(id: number, newStatus: boolean){
    const requestData = {
      isActive: newStatus
    }

    return this.http.put(
      this.apiUrl + `user/edit/${id}`,
      requestData,
      {responseType: 'json'}
    );
  }
}
