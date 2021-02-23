import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m=>m.UserModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule)},
  {path: 'error', component: ErrorComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
