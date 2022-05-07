import { of } from 'rxjs';
import { mapToClass, mapToClasses } from './operators';

interface UserTestInterface {
  name: string;
}

class UserTest {
  name: string;

  constructor(data: UserTestInterface) {
    this.name = data.name;
  }
}

describe('Operators Utils', () => {
  it('should transform the observable in a class instace', () => {
    const mockResponse = of({ name: 'Nome teste' });
    const mapper = mapToClass(UserTest);

    mapper(mockResponse).subscribe((mappedObj) => {
      expect(mappedObj).toBeInstanceOf(UserTest);
    });
  });

  it('should transform the observable in a array of class instaces', () => {
    const mockResponse = of([{ name: 'Nome teste' }]);
    const mapper = mapToClasses(UserTest);

    mapper(mockResponse).subscribe((mappedObj) => {
      expect(mappedObj[0]).toBeInstanceOf(UserTest);
    });
  });
});
