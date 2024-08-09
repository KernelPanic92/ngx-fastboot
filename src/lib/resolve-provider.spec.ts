/* eslint-disable max-lines-per-function */
import { resolveProvider } from './resolve-provider';
import { AngularProvider, FastProvider } from './types';

describe('resolveProvider', () => {
  it('should return the provider as is if it is an array', async () => {
    const provider: AngularProvider[] = [
      { provide: 'test', useValue: 'value' },
    ];
    const exprected: AngularProvider[] = [
      { provide: 'test', useValue: 'value' },
    ];

    const actual = await resolveProvider(provider);

    expect(actual).toEqual(exprected);
  });

  it('should return the provider in an array if it is not a function', async () => {
    const provider: AngularProvider = { provide: 'test', useValue: 'value' };
    const expected: Array<AngularProvider> = [
      { provide: 'test', useValue: 'value' },
    ];

    const actual = await resolveProvider(provider);

    expect(actual).toEqual(expected);
  });

  it('should return the provider in an array if it is a TypeProvider', async () => {
    class MyClass {}
    const provider: FastProvider = MyClass;
    const expected: FastProvider = [MyClass];

    const actual = await resolveProvider(provider);

    expect(actual).toEqual(expected);
  });

  it('should load and return the module if it is a function and not a TypeProvider', async () => {
    const moduleProvider: FastProvider = async () => ({
      provide: 'test',
      useValue: 'value',
    });
    const expected: AngularProvider = [{ provide: 'test', useValue: 'value' }];

    const result = await resolveProvider(moduleProvider);

    expect(result).toEqual(expected);
  });

  it('should handle a module that returns an array of providers', async () => {
    const moduleProvider: FastProvider = async () => [
      { provide: 'test1', useValue: 'value1' },
      { provide: 'test2', useValue: 'value2' },
    ];
    const expected: AngularProvider[] = [
      { provide: 'test1', useValue: 'value1' },
      { provide: 'test2', useValue: 'value2' },
    ];

    const result = await resolveProvider(moduleProvider);

    expect(result).toEqual(expected);
  });
});
