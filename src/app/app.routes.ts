import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { NotFoundPageComponent } from './page/not-found-page/not-found-page.component';
import { ErrorPageComponent } from './page/error-page/error-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', component: NotFoundPageComponent },
  { path: '500', component: ErrorPageComponent },


];
