export interface RestorePassRequestInterface {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export class RestorePassRequest {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;

  constructor(restorePassRequestInterface: RestorePassRequestInterface) {
    this.email = restorePassRequestInterface.email;
    this.token = restorePassRequestInterface.token;
    this.newPassword = restorePassRequestInterface.newPassword;
    this.confirmPassword = restorePassRequestInterface.confirmPassword;
  }
}
