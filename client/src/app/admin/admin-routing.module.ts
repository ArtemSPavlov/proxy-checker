import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProxiesAdministrationComponent } from './proxies-administration/proxies-administration.component';
import { UsersAdministrationComponent } from './users-administration/users-administration.component';

const routes: Routes = [
  {path: '', component: AdminComponent, children: [
      {path: 'users', component: UsersAdministrationComponent},
      {path: 'proxies', component: ProxiesAdministrationComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
