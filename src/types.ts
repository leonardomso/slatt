import { Schema } from 'yup';

export type SlattValues = {
  [field: string]: any;
};

export type SlattArguments = {
  initialValues: SlattValues;
  onSubmit: (values: SlattValues) => void;
  validationSchema?: Schema<SlattValues>;
};

export type SlattErrors<Values> = {
  [K in keyof Values]?: Values[K] extends object
    ? SlattErrors<Values[K]>
    : string;
};
