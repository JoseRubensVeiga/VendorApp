export interface SignInRequestInterface {
  email: string;
  password: string;
}

export class SignInRequest {
  email: string;
  password: string;

  constructor(signInRequestData: SignInRequestInterface) {
    this.email = signInRequestData.email;
    this.password = signInRequestData.password;
  }
}
