import { resolveProvider } from './resolve-provider';
import { AngularProvider, FastProvider } from './types';

export const resolveProviders = async (
  providers: Array<FastProvider>,
): Promise<Array<AngularProvider>> => {
  const unflattedProviders: Array<Array<AngularProvider>> = await Promise.all(
    providers.map(resolveProvider),
  );

  return unflattedProviders.flat();
};
