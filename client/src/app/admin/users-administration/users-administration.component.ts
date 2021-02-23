import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/types/user.type';
import { UsersAdministrationService } from './users-administration.service';

@Component({
  selector: 'app-users-administration',
  templateUrl: './users-administration.component.html',
  styleUrls: ['./users-administration.component.scss']
})
export class UsersAdministrationComponent implements OnInit {

  public usersList: User[];
  public displayedColumns: string[] = ['index', 'login', 'uuid', 'email', 'role', 'status', 'buttons'];

  constructor(
    private usersAdministrationService: UsersAdministrationService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void{
    this
      .usersAdministrationService
      .getUsersList()
      .subscribe(
        data => {
          this.usersList = data;
        }
      )
  }

  updateUser(updatedUser: User): void{
    this.usersList = this.usersList.map(user => {
      if(user.uuid === updatedUser.uuid){
        return updatedUser;
      }
      return user;
    });
  }

}
