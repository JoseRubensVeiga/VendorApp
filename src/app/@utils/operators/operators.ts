import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

type GenericClass<T> = new (data?: any) => T;

const _mapToClass = <T>(obj: any, _class: GenericClass<T>): T =>
  new _class(obj);

const _mapToClasses = <T>(obj: any[], _class: GenericClass<T>): T[] =>
  obj.map((d) => new _class(d));

export const mapToClass = <T>(
  _class: GenericClass<T>
): OperatorFunction<any, T> => map((value) => _mapToClass(value, _class));

export const mapToClasses = <T>(
  _class: GenericClass<T>
): OperatorFunction<any, T[]> => map((value) => _mapToClasses(value, _class));
