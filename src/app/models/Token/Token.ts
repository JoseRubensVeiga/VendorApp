/* eslint-disable @typescript-eslint/naming-convention */
export interface TokenInterface {
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface TokenResponseInterface {
  token: TokenInterface;
}

export class Token {
  expires_in: number;
  access_token: string;
  refresh_token: string;

  constructor(tokenInterface: TokenInterface) {
    this.expires_in = tokenInterface.expires_in;
    this.access_token = tokenInterface.access_token;
    this.refresh_token = tokenInterface.refresh_token;
  }
}

export class TokenResponse {
  token: Token;

  constructor(tokenResponseInterface: TokenResponseInterface) {
    this.token = new Token(tokenResponseInterface.token);
  }
}
