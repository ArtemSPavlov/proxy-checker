import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { LoadUser } from './store/actions/user.action';
import { IAppState } from './store/state/app.state';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private store: Store<IAppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  getUser(){
    if(this.authService.getAccessToken()){
      this.store.dispatch(new LoadUser);
    } else {
      this.router.navigate(['auth']);
    }
  }
}
