import { Schema } from 'yup';

import { SlattValues, SlattErrors } from './types';

export const isNull = (obj: any) => obj === null || obj === undefined;

export const isEmpty = (obj: any) =>
  isObject(obj) && Object.entries(obj).length === 0;

export const isFunction = (obj: any): obj is Function =>
  typeof obj === 'function';

export const isObjectEmpty = (obj: any) => Object.keys(obj).length === 0;

export const isObject = (obj: any): obj is Object =>
  obj !== null && typeof obj === 'object';

export const hasErrors = (errs: any) => isObject(errs) && !isEmpty(errs);

export const formatSlattErrors = <Values extends SlattValues>(
  error: any
): SlattErrors<Values> => {
  const errors: any = {} as SlattErrors<Values>;

  if (typeof error === 'object' && error.hasOwnProperty('inner')) {
    for (const err of error.inner) {
      if (!errors[err.path]) {
        errors[err.path] = err.message;
      }
    }
  }

  return errors;
};

export const validateSlattSchema = <Values extends SlattValues>(
  schema: Schema<Values>,
  values: Values
): boolean => {
  try {
    schema.validateSync(values);
  } catch (error) {
    if (error.message.includes('Promise')) return true;
  }

  return false;
};
