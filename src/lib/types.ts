import {
  ApplicationConfig,
  EnvironmentProviders,
  Provider,
} from '@angular/core';

export type LazyModule<T> = () => Promise<T | { default: T }>;

export type AngularProvider = Provider | EnvironmentProviders;

export type LazyProvider = LazyModule<AngularProvider | Array<AngularProvider>>;

export type FastProvider = Provider | EnvironmentProviders | LazyProvider;

export type FastApplicationConfig = Omit<ApplicationConfig, 'providers'> & {
  providers: Array<FastProvider>;
};
