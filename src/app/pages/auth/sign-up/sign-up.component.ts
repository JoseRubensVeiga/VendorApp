import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpRequest } from 'src/app/models/SignUp';
import { AuthService } from 'src/app/services/auth';
import { NotificationService } from 'src/app/services/notification';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    const signUpParams = this.getSignUpRequestParams();

    this.authService.signUp(signUpParams).subscribe(() => {
      this.notification.success('Bem vindo!');
    });
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      fullName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, [Validators.required]],
    });
  }

  private getFormValue(): any {
    return this.formGroup.getRawValue();
  }

  private getSignUpRequestParams(): SignUpRequest {
    const formValue = this.getFormValue();

    return new SignUpRequest({
      fullName: formValue.fullName,
      email: formValue.email,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
    });
  }
}
