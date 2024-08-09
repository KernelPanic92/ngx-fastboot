import { TypeProvider } from '@angular/core';

import { FastProvider } from './types';

export const isTypeProvider = (value: FastProvider): value is TypeProvider => {
  if (typeof value !== 'function') {
    return false;
  }

  if (!value.prototype) {
    return false;
  }

  return value.prototype.constructor === value;
};
