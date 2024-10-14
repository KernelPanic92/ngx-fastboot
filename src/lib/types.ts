import {
  ApplicationConfig,
  EnvironmentProviders,
  Provider,
  Type,
} from '@angular/core';

export type LazyModule<T> = () => Promise<T | { default: T }>;

export type AngularProvider = Provider | EnvironmentProviders;

export type LazyProvider = LazyModule<AngularProvider | Array<AngularProvider>>;

export type LazyComponent = LazyModule<Type<unknown>>;

export type FastProvider = AngularProvider | LazyProvider;

export type FastComponent = Type<unknown> | LazyComponent;

export type FastApplicationConfig = Omit<ApplicationConfig, 'providers'> & {
  providers: Array<FastProvider>;
};
