import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {path: '', component: UserComponent},
  {path: 'change-password', component: PasswordChangeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
