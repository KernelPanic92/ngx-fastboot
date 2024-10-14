import { ApplicationConfig, ApplicationRef } from '@angular/core';
import type { bootstrapApplication } from '@angular/platform-browser';

import { resolveDependencies } from './resolve-dependencies';
import { FastApplicationConfig, FastComponent } from './types';

/**
 * Dynamically loads the specified providers in the configuration and bootstraps an Angular application.
 *
 * This function uses the `bootstrapApplication` method to start an Angular application with providers
 * that are dynamically loaded and resolved. The application configuration can include providers that need to
 * be loaded asynchronously. This function handles resolving these providers and passing them to the bootstrap method.
 *
 * @param bootstrap - The Angular application's bootstrap function (typically `bootstrapApplication`).
 * @param rootComponent - The root component of the application, which should be of type `FastComponent`
 *                  (ie. Type<unknown> or lazy module that return this component).
 * @param options - (Optional) The application configuration, including the providers to be loaded. It should conform
 *                  to the `FastApplicationConfig` type. Providers can be `Provider`, `EnvironmentProviders`,
 *                  or lazy modules that return these providers.
 *
 * @returns A Promise that resolves to an `ApplicationRef` instance of the bootstrapped application. The bootstrap
 *          method is called with the root component and the updated configuration with the resolved providers.
 *
 * @example
 * ```typescript
 * import { AppComponent } from './app.component';
 * import { bootstrapApplication } from '@angular/platform-browser';
 * import { fast } from 'ngx-fastboot';
 *
 * fast(bootstrapApplication, AppComponent, {
 *   providers: [
 *     MyProvider,
 *     () => import('./my-provider.module'),
 *   ]
 * }).then(() => console.log('App is bootstrapped'))
 *   .catch(error => {
 *     console.error('Error bootstrapping the app', error);
 *   });
 * ```
 */
export const fast = async (
  bootstrap: typeof bootstrapApplication,
  rootComponent: FastComponent,
  options?: FastApplicationConfig,
): Promise<ApplicationRef> => {
  const { component, providers } = await resolveDependencies(
    rootComponent,
    options?.providers ?? [],
  );
  const nextOptions: ApplicationConfig = {
    ...options,
    providers,
  };

  return bootstrap(component, nextOptions);
};
