import { SignInRequest, SignInRequestInterface } from './SignIn';

describe('SignIn', () => {
  let signInInterfaceData: SignInRequestInterface;

  beforeEach(() => {
    signInInterfaceData = {
      email: 'example@email.com',
      password: '12345',
    };
  });

  it('should create a SignIn instance', () => {
    const signIn = new SignInRequest(signInInterfaceData);

    expect(signIn).toBeInstanceOf(SignInRequest);
  });
});
