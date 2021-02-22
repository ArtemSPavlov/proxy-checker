import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/types/user.type';
import { UsersAdministrationService } from '../users-administration/users-administration.service';

@Component({
  selector: 'app-admin-list-buttons',
  templateUrl: './admin-list-buttons.component.html',
  styleUrls: ['./admin-list-buttons.component.scss']
})
export class AdminListButtonsComponent implements OnInit {
  @Input() user: User;

  constructor(
    private usersAdministrationService: UsersAdministrationService
  ) { }

  ngOnInit(): void {
  }

  changeActivityStatus(){
    this.usersAdministrationService.changeUserStatus(this.user.id, !this.user.isActive);
  }

}
