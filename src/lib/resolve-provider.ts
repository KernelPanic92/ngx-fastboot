import { isTypeProvider } from './is-type-provider';
import { loadModule } from './load-module';
import { AngularProvider, FastProvider } from './types';

export const resolveProvider = async (
  provider: FastProvider,
): Promise<Array<AngularProvider>> => {
  if (Array.isArray(provider)) {
    return provider;
  }

  if (typeof provider !== 'function') {
    return [provider];
  }

  if (isTypeProvider(provider)) {
    return [provider];
  }

  let loadedProvider = await loadModule(provider);

  if (!Array.isArray(loadedProvider)) {
    loadedProvider = [loadedProvider];
  }

  return loadedProvider;
};
