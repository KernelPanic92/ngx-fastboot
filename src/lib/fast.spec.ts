
import type { bootstrapApplication } from '@angular/platform-browser';
import { fast } from './fast';
import { ApplicationConfig, Type } from '@angular/core';
import { FastApplicationConfig } from './types';

describe('fast', () => {
  let bootstrap: typeof bootstrapApplication;
  beforeEach(() => {
    bootstrap = jest.fn();
  });

  it('should resolve providers and bootstrap the application', async () => {
    const rootComponent: Type<unknown> = class {};
    const options: FastApplicationConfig = {
      providers: [
        { provide: 'test1', useValue: 'value1' },
        () => Promise.resolve({ provide: 'test2', useValue: 'value2' }),
      ],
    };

    const expected: ApplicationConfig = {
        providers:[
        { provide: 'test1', useValue: 'value1' },
        { provide: 'test2', useValue: 'value2' },
      ],
    };

    await fast(bootstrap, rootComponent, options);

    expect(bootstrap).toHaveBeenCalledWith(rootComponent, expected);
  });

  it('should handle empty options and providers', async () => {
    const rootComponent: Type<unknown> = class {};

    const expected: ApplicationConfig = {
        providers: [],
    };

    await fast(bootstrap, rootComponent);

    expect(bootstrap).toHaveBeenCalledWith(rootComponent, expected);
  });

  it('should throw an error if bootstrap fails', async () => {
    const rootComponent: Type<unknown> = class {};
    const options: FastApplicationConfig = {
      providers: [
        { provide: 'test1', useValue: 'value1' },
        () => Promise.reject('Test error'),
      ],
    };

    const actual = fast(bootstrap, rootComponent, options);
    
    expect(actual).rejects.toThrow('Test error');
  });
});
