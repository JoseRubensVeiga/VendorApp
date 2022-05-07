import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent implements OnInit {
  formGroup: FormGroup;

  get email(): string {
    return this.formGroup.get('email')?.value;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const email = this.email;

    this.authService.requestPass(email).subscribe(({ data }) => {
      this.router.navigate(['auth', 'restore-password'], {
        queryParams: {
          t: data,
          e: email,
        },
      });
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, Validators.required],
    });
  }
}
