import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login';
import { RecoveryPasswordComponent } from './recovery-password';
import { RestorePasswordComponent } from './restore-password';
import { SignUpComponent } from './sign-up';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'recovery-password', component: RecoveryPasswordComponent },
      { path: 'restore-password', component: RestorePasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
