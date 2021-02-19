import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LoadUser } from './store/actions/user.action';
import { IAppState } from './store/state/app.state';
import { MainPageService } from './main-page/main-page.service';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';
import { selectSelectedUser } from './store/selectors/user.selectors';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  authorizedUser: any;

  constructor(
    private store: Store<IAppState>,
    private appServise: AppService,
    private userService: UserService,
    private router: Router,
  ){
    this.authorizedUser = this.store.pipe(
      select(selectSelectedUser)
    ).subscribe(
      data => this.authorizedUser = data
    )
  }

  ngOnInit(): void {
    this.appServise.getUser();
  }

  logout(): void {
    this.userService.removeAuthorizedUser();
    this.router.navigate(['auth']);
  }

}
