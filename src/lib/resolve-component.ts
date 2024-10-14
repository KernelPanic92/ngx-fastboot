import { Type } from '@angular/core';

import { isTypeProvider } from './is-type-provider';
import { loadModule } from './load-module';
import { FastComponent } from './types';

export const resolveComponent = async (
  component: FastComponent,
): Promise<Type<unknown>> => {
  if (isTypeProvider(component)) {
    return component;
  }

  const loadedProvider = await loadModule(component);

  return loadedProvider;
};
