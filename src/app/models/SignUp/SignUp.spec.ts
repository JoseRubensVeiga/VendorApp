import { SignUpRequest, SignUpRequestInterface } from './SignUp';

describe('SignUp', () => {
  let signUpInterfaceData: SignUpRequestInterface;

  beforeEach(() => {
    signUpInterfaceData = {
      email: 'example@email.com',
      password: '12345',
      confirmPassword: '12345',
      fullName: 'Nome exemplo',
    };
  });

  it('should create a SignUp instance', () => {
    const signUp = new SignUpRequest(signUpInterfaceData);

    expect(signUp).toBeInstanceOf(SignUpRequest);
  });
});
