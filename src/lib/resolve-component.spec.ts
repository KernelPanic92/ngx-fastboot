import { Type } from '@angular/core';

import { resolveComponent } from './resolve-component';

describe('resolveComponent', () => {
  it('should return the component if it is a Type', async () => {
    class MyComponent {}

    const actual = await resolveComponent(MyComponent);

    expect(actual).toBe(MyComponent);
  });

  it('should load the component using loadModule if it is a lazy import', async () => {
    class LoadedComponent {}
    const dynamicImport = () => Promise.resolve(LoadedComponent).then((c) => c);

    const result = await resolveComponent(dynamicImport);

    expect(result).toBe(LoadedComponent);
  });

  it('should load the component using loadModule if it is a lazy default import', async () => {
    class LoadedComponent {}
    const dynamicImport = () => Promise.resolve({ default: LoadedComponent });

    const result = await resolveComponent(dynamicImport);

    expect(result).toBe(LoadedComponent);
  });

  it('should throw an error if loadModule fails', async () => {
    const dynamicImport = () =>
      Promise.reject<Type<unknown>>(new Error('Failed to load module'));

    await expect(resolveComponent(dynamicImport)).rejects.toThrow(
      'Failed to load module',
    );
  });
});
