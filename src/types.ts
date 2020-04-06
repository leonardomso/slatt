import * as Yup from 'yup';

export type SlattConfig<Values extends {}> = {
  initialValues: Values;
  onSubmit: (values: Values) => void;
  validationSchema?: Yup.ObjectSchema<Values>;
};

export type SlattErrors<Values> = {
  [K in keyof Values]?: Values[K] extends object
    ? SlattErrors<Values[K]>
    : string;
};

export type SlattState<Values> = {
  values: Values;
  errors: SlattErrors<Values>;
  isValidating: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  handleChange: (event: any) => void;
  handleReset: () => void;
  handleSubmit: (values: Values) => void;
};

export type FormHooksConfig<Values extends {}> = {
  initialValues: Values;
  onSubmit: (values: Values) => void;
  validationSchema?: Yup.ObjectSchema<Values>;
};

export type FormHooksErrors<Values> = {
  [K in keyof Values]?: Values[K] extends object
    ? FormHooksErrors<Values[K]>
    : string;
};

export type FormHooksState<Values> = {
  values: Values;
  errors: SlattErrors<Values>;
  isValidating: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  handleChange: (event: any) => void;
  handleReset: () => void;
  handleSubmit: (values: Values) => void;
};
