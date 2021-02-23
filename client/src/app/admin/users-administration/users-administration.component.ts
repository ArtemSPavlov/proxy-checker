import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/types/user.type';
import { UsersAdministrationService } from './users-administration.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogWindowComponent } from '../delete-dialog-window/delete-dialog-window.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-users-administration',
  templateUrl: './users-administration.component.html',
  styleUrls: ['./users-administration.component.scss']
})
export class UsersAdministrationComponent implements OnInit {

  public usersList: User[];
  public displayedColumns: string[] = ['index', 'login', 'uuid', 'email', 'role', 'status', 'buttons'];

  constructor(
    private usersAdministrationService: UsersAdministrationService,
    public dialog: MatDialog
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

  private updateUser(updatedUser: User): void{
    this.usersList = this.usersList.map(user => {
      if(user.uuid === updatedUser.uuid){
        return updatedUser;
      }
      return user;
    });
  }

  private deleteUser(deletedUser: User): void{
    this.usersList = this.usersList.filter(user => {
      if(user.uuid !== deletedUser.uuid){
        return user;
      }
    });
  }

  openDialog(user: User): void{
    const dialogRef = this.dialog.open(DeleteDialogWindowComponent, {
      width: '250px',
      data: user
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter<User>(user => !!user)
      )
      .subscribe(result => {
        this
          .usersAdministrationService
          .deleteUser(result)
          .subscribe(
            data => this.deleteUser(data)
          )
      });
  }
}
