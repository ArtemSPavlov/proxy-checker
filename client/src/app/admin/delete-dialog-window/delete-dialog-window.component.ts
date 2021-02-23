import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/types/user.type';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog-window',
  templateUrl: './delete-dialog-window.component.html',
  styleUrls: ['./delete-dialog-window.component.scss']
})
export class DeleteDialogWindowComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
