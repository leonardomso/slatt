import { SlattValues, SlattErrors } from './types';

export const formatSlattErrors = <T extends SlattValues>(
  error: any,
  setErrors: any
): SlattErrors<T> => {
  const errors: any = {} as SlattErrors<T>;

  if (typeof error === 'object' && error.hasOwnProperty('inner')) {
    for (const err of error.inner) {
      if (!errors[err.path]) {
        errors[err.path] = err.message;
      }
    }
  }

  setErrors(errors);

  return errors;
};
