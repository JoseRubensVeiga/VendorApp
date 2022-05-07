import {
  RestorePassRequest,
  RestorePassRequestInterface,
} from './RestorePassword';

describe('RestorePass', () => {
  let restorePassRequestInterface: RestorePassRequestInterface;

  beforeEach(() => {
    restorePassRequestInterface = {
      email: 'example@email.com',
      confirmPassword: '12345',
      newPassword: '12345',
      token: 'teste token',
    };
  });

  it('should create a RestorePass instance', () => {
    const restorePass = new RestorePassRequest(restorePassRequestInterface);

    expect(restorePass).toBeInstanceOf(RestorePassRequest);
  });
});
