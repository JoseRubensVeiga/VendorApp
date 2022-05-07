/* eslint-disable @typescript-eslint/naming-convention */
import {
  Token,
  TokenInterface,
  TokenResponse,
  TokenResponseInterface,
} from './Token';

describe('Token', () => {
  let tokenData: TokenInterface;
  let tokenResponseData: TokenResponseInterface;

  beforeEach(() => {
    tokenData = {
      access_token: '',
      expires_in: 0,
      refresh_token: '',
    };

    tokenResponseData = {
      token: tokenData,
    };
  });

  it('should create a Token instance', () => {
    const token = new Token(tokenData);

    expect(token).toBeInstanceOf(Token);
  });

  it('should create a TokenResponse instance', () => {
    const tokenResponse = new TokenResponse(tokenResponseData);

    expect(tokenResponse).toBeInstanceOf(TokenResponse);
  });
});
