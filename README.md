# ngx-fastboot

<p align="center">
  <img src="ngx-fastboot.png" alt="ngx-fastboot-logo" width="200px" height="200px"/>
  <br/>
  <em><b>ngx-fastboot</b> is a dynamic configuration loader for Angular applications. It optimizes the startup performance by loading configurations in a separate chunk during compilation.</em>
</p>
<br/>


[![bundlephobia](https://badgen.net/bundlephobia/minzip/ngx-fastboot)](https://bundlephobia.com/result?p=ngx-fastboot)
[![Semantic Release](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Build Status](https://img.shields.io/github/actions/workflow/status/KernelPanic92/ngx-fastboot/release.yml?branch=main)](https://github.com/KernelPanic92/ngx-fastboot/actions)
[![Coverage Status](https://coveralls.io/repos/github/KernelPanic92/ngx-fastboot/badge.svg?branch=main)](https://coveralls.io/github/KernelPanic92/ngx-fastboot?branch=main)
[![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?logo=angular&logoColor=white)](https://angular.io/)
[![Tsup](https://img.shields.io/badge/tsup-fast--transpiler-brightgreen)](https://github.com/egoist/tsup)

## Why Use ngx-fastboot?
Modern web applications often require a multitude of providers, which can increase the initial bundle size and slow down application startup. Splitting code into multiple chunks helps mitigate these issues by:

- **Reducing Initial Bundle Size:** By moving configuration-related code into separate chunks, the initial bundle size is minimized, leading to faster load times and improved performance.
- **Improving Load Performance:** Smaller initial bundles load quicker, especially over slower network connections, enhancing the user experience.
- **Mitigating Compilation Warnings:** Angular may generate warnings if the initial bundle size exceeds recommended limits. ngx-fastboot helps distribute the load, reducing the likelihood of these warnings.

## Features

- **Dynamic Configuration Loading**: Load and resolve Angular providers dynamically.
- **Performance Optimization**: Improve application startup performance by offloading configuration to a separate chunk.
- **Seamless Integration**: Easy integration with existing Angular projects.
- **Support for Lazy Configurations**: Load Angular Providers lazily for better performance.

## Installation

with npm:
```bash
npm install ngx-fastboot
```

with pnpm:
```bash
pnpm add ngx-fastboot
```

with yarn:
```bash
yarn add ngx-fastboot
```

## Usage

To use **ngx-fastboot**, import the `fastBootstrapApplication` function and call it as your Angular application's `bootstrapApplication` function.

### Example

#### Before

`main.ts`
```typescript
import { AppComponent } from './app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import provideMyDefaultExportFeatures from './default-export-features.config';
import { provideMyOtherFeatures } from './my-other-features.config';

bootstrapApplication(AppComponent, {
  providers: [
    MyProvider,
    provideMyDefaultExportFeatures,
    provideMyOtherFeatures,
  ]
}).then(appRef => {
  console.log('App is bootstrapped');
}).catch(error => {
  console.error('Error bootstrapping the app', error);
});
```

#### After

`main.ts`
```typescript
import { AppComponent } from './app.component';
import { fastBootstrapApplication } from 'ngx-fastboot';

fastBootstrapApplication(AppComponent, {
  providers: [
    MyProvider,
    () => import('./default-export-features.config'), // default export config
    () => import('./my-other-features.config').then((m) => m.provideMyOtherFeatures),
  ]
}).then(appRef => {
  console.log('App is bootstrapped');
}).catch(error => {
  console.error('Error bootstrapping the app', error);
});
```

### Providers

`ngx-fastboot` provides great flexibility in how providers are loaded. Each element of the `providers` field can be either a **single provider** or an **array of providers**, depending on the needs of your application.

You can specify these providers in three main ways:

- **Static import**: The traditional method used during the application's bootstrap, where providers are imported and directly included at configuration time. This approach is simple but can increase the initial bundle size.

- **Dynamic Named Import**: To reduce the bundle size, you can load providers dynamically using a named import. In this way, providers are only loaded when they are actually needed.

- **Dynamic Default Import**: Similar to named import, but loads the provider or a group of providers using the default export of the module. This is useful when a module exports a single provider or an array of providers as a default value.

#### Static Import

`main.ts`
```typescript
import { AppComponent } from './app.component';
import { MyProvider } from 'providers/my-provider';
import { OtherProvider } from 'providers/other-provider';
import { fastBootstrapApplication } from 'ngx-fastboot';

fastBootstrapApplication(AppComponent, {
  providers: [
    MyProvider,
    OtherProvider,
  ]
}).then(appRef => {
  console.log('App is bootstrapped');
}).catch(error => {
  console.error('Error bootstrapping the app', error);
});
```

#### Dynamic Named Import

`providers/my-provider.ts`
```typescript
export const MyProvider: Provider = ....;
```

`providers/other-provider.ts`
```typescript
export const OtherProvider = [
  provideHttpClient(),
  ReactiveFormsModule,
  provideZoneChangeDetection({ eventCoalescing: true }),
] satisfies Array<Provider | EnvironmentProviders>;
```

`main.ts`
```typescript
import { AppComponent } from './app.component';
import { fastBootstrapApplication } from 'ngx-fastboot';

fastBootstrapApplication(AppComponent, {
  providers: [
    () => import('providers/my-provider').then((m) => m.MyProvider), // single
    () => import('providers/other-provider').then((m) => m.OtherProvider), // array
  ]
}).then(appRef => {
  console.log('App is bootstrapped');
}).catch(error => {
  console.error('Error bootstrapping the app', error);
});
```

#### Dynamic Default Import
`providers/my-provider.ts`
```typescript
const MyProvider: Provider = ....;
export default MyProvider;
```

`providers/other-provider.ts`
```typescript
export default [
  provideHttpClient(),
  ReactiveFormsModule,
  provideZoneChangeDetection({ eventCoalescing: true }),
] satisfies Array<Provider | EnvironmentProviders>;
```

`main.ts`
```typescript
import { AppComponent } from './app.component';
import { fastBootstrapApplication } from 'ngx-fastboot';

fastBootstrapApplication(AppComponent, {
  providers: [
    () => import('providers/my-provider'), // single
    () => import('providers/other-provider'), // array
  ]
}).then(appRef => {
  console.log('App is bootstrapped');
}).catch(error => {
  console.error('Error bootstrapping the app', error);
});
```

#### Full example

`main.ts`
```typescript
import { AppComponent } from './app.component';
import { MyStaticImportedProvider } from './providers/my-static-imported-provider';
import { fastBootstrapApplication } from 'ngx-fastboot';

fastBootstrapApplication(AppComponent, {
  providers: [
    MyStaticImportedProvider,
    () => import('providers/my-provider').then((m) => m.MyProvider),
    () => import('providers/other-provider'),
  ]
}).then(appRef => {
  console.log('App is bootstrapped');
}).catch(error => {
  console.error('Error bootstrapping the app', error);
});
```

### RootComponent

Similar to providers, you can manage the root component of the application both **statically** and **dynamically**. Dynamically loading the root component can help reduce the initial bundle size.

#### Static Import

The classic method to bootstrap the root component involves a static import:

```typescript
fastBootstrapApplication(AppComponent, {
  providers: [...]
});
```

#### Dynamic Named Import
To optimize bundle size, the root component can be loaded dynamically with a named import:

```typescript
fastBootstrapApplication(
  () => import('./app-component').then((m) => m.AppComponent), {
  providers: [...]
});
```

#### Dynamic Default Import
Alternatively, you can use a dynamic default import if the root component is exported as the default from the module:

```typescript
fastBootstrapApplication(
  () => import('./app-component'), {
  providers: [...]
});
```

### Sentry Integration Example
This example shows how to integrate Sentry with ngx-fastboot for error monitoring and performance tracing in your Angular application.

`src/app/configs/sentry.config.ts`
```typescript
import { APP_INITIALIZER, EnvironmentProviders, ErrorHandler, Provider } from '@angular/core';
import { Router } from '@angular/router';
import {
  createErrorHandler,
  init,
  TraceService,
} from '@sentry/angular-ivy';

export default [
  {
    provide: ErrorHandler,
    useValue: createErrorHandler({
      showDialog: false,
      logErrors: true,
    }),
  },
  {
    provide: TraceService,
    deps: [Router],
  },
  {
    provide: APP_INITIALIZER,
    useFactory: () => () => {},
    deps: [TraceService],
    multi: true,
  },
] satisfies Array<Provider | EnvironmentProviders>;
```

`src/app/configs/sentry.init.ts`
```typescript
import {
  browserTracingIntegration,
  init,
  replayIntegration,
} from '@sentry/angular-ivy';

export function initSentryConfig() {
  init({
    dsn: '<your-dsn>',
    integrations: [browserTracingIntegration(), replayIntegration()],
    ...etc
  });
  console.info('Sentry initialized.');
}
```

`src/main.ts`
```typescript
import { AppComponent } from './app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { fast } from 'ngx-fastboot';

fastBootstrapApplication(AppComponent, {
  providers: [
    () => import('./app/configs/sentry.config'),
  ],
})
  .then(() => import('./app/configs/sentry.init')
  .then((init) => init.initSentryConfig()))
  .catch(error => {
    console.error('Error bootstrapping the app', error);
  });

```

## API

### `fastBootstrapApplication`

Dynamically loads the specified providers in the configuration and bootstraps an Angular application.

#### Parameters

- **`rootComponent`**: The root component of the application, which should be of type `FastComponent`.
- **`options`**: (Optional) The application configuration, including the providers to be loaded. It should conform to the `FastApplicationConfig` type. Providers can be `Provider`, `EnvironmentProviders`, or lazy modules that return these providers.

#### Returns

A `Promise` that resolves to an `ApplicationRef` instance of the bootstrapped application. The bootstrap method is called with the root component and the updated configuration with the resolved providers.

### `fast`

Dynamically loads the specified providers in the configuration and bootstraps an Angular application passing a custom bootstrap function.

#### Parameters

- **`bootstrap`**: The bootstrap function (typically `bootstrapApplication`).
- **`rootComponent`**: The root component of the application, which should be of type `FastComponent`.
- **`options`**: (Optional) The application configuration, including the providers to be loaded. It should conform to the `FastApplicationConfig` type. Providers can be `Provider`, `EnvironmentProviders`, or lazy modules that return these providers.

#### Returns

A `Promise` that resolves to an `ApplicationRef` instance of the bootstrapped application. The bootstrap method is called with the root component and the updated configuration with the resolved providers.

## Types

### `FastApplicationConfig`

```typescript
export type FastApplicationConfig = ApplicationConfig & {
  providers: Array<FastProvider>
}
```

### `FastProvider`

```typescript
export type FastProvider = Provider | EnvironmentProviders | LazyModule<Provider | EnvironmentProviders | Array<Provider | EnvironmentProviders>>;
```

### `LazyModule`

```typescript
export type LazyModule<T> = () => Promise<T | { default: T }>;
```

### `AngularProvider`

```typescript
export type AngularProvider = Provider | EnvironmentProviders;
```

### `FastComponent`

```typescript
export type FastComponent = Type<unknown> | LazyComponent;
```

### `LazyComponent`

```typescript
export type LazyComponent = LazyModule<Type<unknown>>;
```

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to learn how you can help improve **ngx-fastboot**.

## License

**ngx-fastboot** is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Keywords

angular, angular performance, dynamic configuration, lazy loading, angular bootstrap, ngx-fastboot

## Contact

For any questions or feedback, please [open an issue](https://github.com/KernelPanic92/ngx-fastboot/issues).
