import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { User } from 'src/app/types/user.type';
import { UsersAdministrationService } from '../users-administration/users-administration.service';

@Component({
  selector: 'app-admin-list-buttons',
  templateUrl: './admin-list-buttons.component.html',
  styleUrls: ['./admin-list-buttons.component.scss']
})
export class AdminListButtonsComponent implements OnInit {
  @Input() user: User;
  @Output() changeStatus = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();

  constructor(
    private usersAdministrationService: UsersAdministrationService
  ) { }

  ngOnInit(): void {
  }

  changeActivityStatus(): void{
    const response = this.usersAdministrationService.changeUserStatus(this.user, !this.user.isActive);
    response.subscribe(
      data => {
        this.changeStatus.emit(data);
      }
    )
  }

  removeCurrentUser(): void{
    this.deleteUser.emit(this.user);
  }

}
