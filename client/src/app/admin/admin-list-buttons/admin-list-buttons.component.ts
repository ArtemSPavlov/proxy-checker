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
  @Output() changeStatus = new EventEmitter();

  constructor(
    private usersAdministrationService: UsersAdministrationService
  ) { }

  ngOnInit(): void {
  }

  changeActivityStatus(){
    const response = this.usersAdministrationService.changeUserStatus(this.user, !this.user.isActive);
    response.subscribe(
      data => {
        console.log('Data: ', data);
        this.changeStatus.emit('Event');
      }
    )
  }

}
