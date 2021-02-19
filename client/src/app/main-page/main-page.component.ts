import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { response } from 'express';
import { ApiService } from '../api/api.service';
import { LoadUser } from '../store/actions/user.action';
import { selectSelectedUser } from '../store/selectors/user.selectors';
import { IAppState } from '../store/state/app.state';
import { User } from '../types/user.type';
import { MainPageService } from './main-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  proxies: any;
  error: any;
  displayedColumns: string[] = ['number', 'host', 'port', 'activity', 'private'];
  user$ = this.store.pipe(select(selectSelectedUser));
  user: User;
  authorizedUser: any;

  constructor(
    private apiService: ApiService,
    private store: Store<IAppState>
    ) {
      this.apiService.getProxies().subscribe(
        data => {this.proxies = JSON.parse(data)},
        error => this.error = error
      );

      this.user$.subscribe(
        value => {
          this.user = value;
        }
      );
    }

  ngOnInit(): void {
  }

}
