import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestorePassRequest } from 'src/app/models/RestorePassword';
import { AuthService } from 'src/app/services/auth';
import { NotificationService } from 'src/app/services/notification';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
})
export class RestorePasswordComponent implements OnInit {
  token: string;
  email: string;

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadParams();
  }

  onSubmit(): void {
    const restorePassRequest = this.getRestorePassRequestBody();
    this.authService.restorePass(restorePassRequest).subscribe(() => {
      this.notification.success('Senha alterada com sucesso!');
      this.goToLogin();
    });
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      newPassword: [null, Validators.required],
      confirmPassword: [
        null,
        [Validators.required, this.equalValidator.bind(this)],
      ],
    });
  }

  private loadParams(): void {
    this.activatedRoute.queryParams.subscribe(({ t: token, e: email }) => {
      if (!token || !email) {
        this.goToLogin();
      }
      this.token = token;
      this.email = email;
    });
  }

  private equalValidator({ value }: FormControl): ValidationErrors | null {
    const newPasswordValue = this.formGroup?.get('newPassword')?.value;

    if (value === newPasswordValue) {
      return null;
    }

    return { notEqual: true };
  }

  private getRestorePassRequestBody(): RestorePassRequest {
    const formValue = this.getFormValue();
    return new RestorePassRequest({
      email: this.email,
      token: this.token,
      newPassword: formValue.newPassword,
      confirmPassword: formValue.confirmPassword,
    });
  }

  private goToLogin(): void {
    this.router.navigate(['auth', 'login']);
  }

  private getFormValue(): { newPassword: string; confirmPassword: string } {
    return this.formGroup.getRawValue();
  }
}
