/* eslint-disable max-lines-per-function */
import {
  ClassProvider,
  ConstructorProvider,
  ExistingProvider,
  FactoryProvider,
  TypeProvider,
  ValueProvider,
} from '@angular/core';

import { isTypeProvider } from './is-type-provider';
import { LazyProvider } from './types';

describe('isTypeProvider', () => {
  it('should return true for a TypeProvider', () => {
    class MyClass {}

    const provider: TypeProvider = MyClass;

    const actual = isTypeProvider(provider);

    expect(actual).toBe(true);
  });

  it('should return false for a ValueProvider', () => {
    const provider: ValueProvider = { provide: 'test', useValue: 'value' };

    const actual = isTypeProvider(provider);

    expect(actual).toBe(false);
  });

  it('should return false for a ClassProvider', () => {
    class MyClass {}
    const provider: ClassProvider = { provide: 'test', useClass: MyClass };

    const actual = isTypeProvider(provider);

    expect(actual).toBe(false);
  });

  it('should return false for a ConstructorProvider', () => {
    class MyClass {}
    const provider: ConstructorProvider = { provide: MyClass, deps: [] };

    const actual = isTypeProvider(provider);

    expect(actual).toBe(false);
  });

  it('should return false for an ExistingProvider', () => {
    class MyClass {}
    const provider: ExistingProvider = {
      provide: 'test',
      useExisting: MyClass,
    };

    const actual = isTypeProvider(provider);

    expect(actual).toBe(false);
  });

  it('should return false for a FactoryProvider', () => {
    class MyClass {}
    const provider: FactoryProvider = {
      provide: 'test',
      useFactory: () => new MyClass(),
    };

    const actual = isTypeProvider(provider);

    expect(actual).toBe(false);
  });

  it('should return false for a LazyProvider', () => {
    const provider: LazyProvider = () =>
      Promise.resolve({ provide: 'test', useValue: 'value' });

    const actual = isTypeProvider(provider);

    expect(actual).toBe(false);
  });
});
