import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../config/config.service';
import { RemoveUser } from '../store/actions/user.action';
import { IAppState } from '../store/state/app.state';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private http: HttpClient,
    private store: Store<IAppState>
  ) { }

  getUser(): Observable<any>{
    return this.http.get(
      this.configService.getConfig().server + 'user',
      {responseType: 'json'}
    )
  }

  removeAuthorizedUser(): void {
    this.authService.removeTokens();
    this.store.dispatch(new RemoveUser);
  }
}
