import { Schema } from 'yup';

export interface SlattValues {
  [key: string]: any;
}

export type SlattConfig<T extends SlattValues> = {
  initialValues: T;
  onSubmit: (values: T) => void;
  validationSchema?: Schema<T>;
};

export type SlattErrors<T extends SlattValues> = {
  [K in keyof T]?: T[K] extends object ? SlattErrors<T[K]> : string;
};

export type SlattState<T extends SlattValues> = {
  values: T;
  errors: SlattErrors<T>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  handleChange: (event: any) => void;
  handleReset: () => void;
  handleSubmit: (values: T) => void;
};
