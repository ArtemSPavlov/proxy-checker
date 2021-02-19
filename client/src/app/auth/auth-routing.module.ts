import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';

const routes: Routes = [
  {path: '', component: SingInComponent},
  {path: 'sing-up', component: SingUpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
