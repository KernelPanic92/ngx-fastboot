# ngx-fastboot

[![Semantic Release](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Build Status](https://img.shields.io/github/actions/workflow/status/KernelPanic92/ngx-fastboot/ci.yml?branch=main)](https://github.com/KernelPanic92/ngx-fastboot/actions)
[![Test Coverage](https://img.shields.io/codecov/c/github/KernelPanic92/ngx-fastboot)](https://codecov.io/gh/KernelPanic92/ngx-fastboot)
[![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?logo=angular&logoColor=white)](https://angular.io/)
[![Tsup](https://img.shields.io/badge/tsup-fast--transpiler-brightgreen)](https://github.com/egoist/tsup)

**ngx-fastboot** is a dynamic configuration loader for Angular applications. It optimizes the startup performance by loading configurations in a separate chunk during compilation.

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

To use **ngx-fastboot**, import the `fast` function and call it with your Angular application's `bootstrapApplication` function, root component, and configuration options.

### Example



#### Before

```typescript
import { AppComponent } from './app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import provideMyDefaultExportFeatures from './default-export-features.config';
import { provideMyOtherFeatures } from './my-other-features.config';
import { fast } from 'ngx-fastboot';

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

```typescript
import { AppComponent } from './app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { fast } from 'ngx-fastboot';

fast(bootstrapApplication, AppComponent, {
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

## API

### `fast`

Dynamically loads the specified providers in the configuration and bootstraps an Angular application.

#### Parameters

- **`bootstrap`**: The Angular application's bootstrap function (typically `bootstrapApplication`).
- **`rootComponent`**: The root component of the application, which should be of type `Type<unknown>`.
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

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to learn how you can help improve **ngx-fastboot**.

## License

**ngx-fastboot** is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Keywords

angular, angular performance, dynamic configuration, lazy loading, angular bootstrap, ngx-fastboot

## Contact

For any questions or feedback, please [open an issue](https://github.com/KernelPanic92/ngx-fastboot/issues).
