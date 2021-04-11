import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersAdministrationComponent } from './users-administration/users-administration.component';
import { ProxiesAdministrationComponent } from './proxies-administration/proxies-administration.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { AdminListButtonsComponent } from './admin-list-buttons/admin-list-buttons.component';
import { DeleteDialogWindowComponent } from './delete-dialog-window/delete-dialog-window.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddDialogWindowComponent } from './add-dialog-window/add-dialog-window.component';
import { EditDialogWindowComponent } from './edit-dialog-window/edit-dialog-window.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AdminComponent,
    UsersAdministrationComponent,
    ProxiesAdministrationComponent,
    AdminNavComponent,
    AdminListButtonsComponent,
    DeleteDialogWindowComponent,
    AddDialogWindowComponent,
    EditDialogWindowComponent,
    AddButtonComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class AdminModule { }
