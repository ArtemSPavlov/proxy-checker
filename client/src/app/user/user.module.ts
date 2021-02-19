import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    UserComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [UserService]
})
export class UserModule { }
