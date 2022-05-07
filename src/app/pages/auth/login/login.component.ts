import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInRequest } from 'src/app/models/SignIn';
import { AuthService } from 'src/app/services/auth';
import { NotificationService } from 'src/app/services/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.redirectIfLogged();
    this.buildForm();
  }

  onSubmit(): void {
    const signInParams = this.getSignInRequestParams();

    this.authService.signIn(signInParams).subscribe(
      () => {
        this.goToDashboard();
      },
      () => {
        this.notification.error('Credenciais incorretas.');
      }
    );
  }

  private redirectIfLogged(): void {
    if (this.authService.isLogged) {
      this.goToDashboard();
    }
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  private getFormValue(): any {
    return this.formGroup.getRawValue();
  }

  private getSignInRequestParams(): SignInRequest {
    const formValue = this.getFormValue();
    return new SignInRequest({
      email: formValue.email,
      password: formValue.password,
    });
  }

  private goToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
}
