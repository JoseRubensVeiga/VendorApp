export interface SignUpRequestInterface {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class SignUpRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(signUpRequestInterface: SignUpRequestInterface) {
    this.fullName = signUpRequestInterface.fullName;
    this.email = signUpRequestInterface.email;
    this.password = signUpRequestInterface.password;
    this.confirmPassword = signUpRequestInterface.confirmPassword;
  }
}
