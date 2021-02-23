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



@NgModule({
  declarations: [
    AdminComponent,
    UsersAdministrationComponent,
    ProxiesAdministrationComponent,
    AdminNavComponent,
    AdminListButtonsComponent,
    DeleteDialogWindowComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatListModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class AdminModule { }
