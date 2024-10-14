import { Type } from '@angular/core';

import { resolveComponent } from './resolve-component';
import { resolveProviders } from './resolve-providers';
import { AngularProvider, FastComponent, FastProvider } from './types';

export const resolveDependencies = async (
  component: FastComponent,
  providers: Array<FastProvider>,
): Promise<{ component: Type<unknown>; providers: Array<AngularProvider> }> => {
  const [resolvedComponent, resolvedProviders] = await Promise.all([
    resolveComponent(component),
    resolveProviders(providers),
  ]);
  return { component: resolvedComponent, providers: resolvedProviders };
};
