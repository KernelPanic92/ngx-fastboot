import { LazyModule } from './types';

export const loadModule = async <T>(module: LazyModule<T>): Promise<T> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = (await module()) as any;
  if (result['default']) {
    return result.default;
  }

  return result;
};
