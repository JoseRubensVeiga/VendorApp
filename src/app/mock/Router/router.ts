import { Routes } from '@angular/router';

import { AuthComponent } from 'src/app/pages/auth/auth.component';
import { LoginComponent } from 'src/app/pages/auth/login';
import { RecoveryPasswordComponent } from 'src/app/pages/auth/recovery-password';
import { RestorePasswordComponent } from 'src/app/pages/auth/restore-password';
import { SignUpComponent } from 'src/app/pages/auth/sign-up';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'recovery-password', component: RecoveryPasswordComponent },
      { path: 'restore-password', component: RestorePasswordComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
