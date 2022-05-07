/* eslint-disable @typescript-eslint/naming-convention */

export class TokenMock {
  expires_in = 0;
  access_token = 'access token';
  refresh_token = 'refresh token';
}

export class TokenResponseMock {
  token = new TokenMock();
}
