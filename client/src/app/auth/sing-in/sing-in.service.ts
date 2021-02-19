import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiService } from '../../api/api.service';
import { LoadUser } from '../../store/actions/user.action';
import { IAppState } from '../../store/state/app.state';

import { ValidateUserDto } from '../../dto/validate-user.dto';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class SingInService {

  private responseError: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private store: Store<IAppState>,
  ) { }

  singIn(requestData: ValidateUserDto): void {
    const response = this.apiService.loginUser(requestData);
    response.subscribe(value => {
      const tokens = JSON.parse(value);
      this.authService.setAccessToken(tokens.access_token);
      this.store.dispatch(new LoadUser);
      this.router.navigate(['']);
    });

  }

  setError(data: any): void {
    this.responseError = data;
  }

  getError(): any {
    return this.responseError;
  }
}
