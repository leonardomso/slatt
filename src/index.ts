import { useCallback, useState } from 'react';

import { SlattValues, SlattConfig, SlattState, SlattErrors } from './types';

import { formatSlattErrors } from './utils';

const useSlatt = <T extends SlattValues>({
  initialValues,
  onSubmit,
  validationSchema,
}: SlattConfig<T>): SlattState<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<SlattErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (event: any) => {
    event.persist();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleResetErrors = useCallback(() => {
    setErrors({});
  }, []);

  const handleReset = useCallback(() => {
    setValues(initialValues);
    handleResetErrors();
  }, [handleResetErrors, initialValues]);

  const handleSubmit = useCallback(
    async (event: any) => {
      if (event) event.preventDefault();

      if (validationSchema) {
        try {
          await onValidateSchema();
        } catch (error) {
          return;
        }
      }

      setIsSubmitting(true);
      await onSubmit(values);
      setIsSubmitted(true);
      setIsSubmitting(false);
    },
    [onSubmit, values, handleResetErrors]
  );

  const onValidateSchema = useCallback(async () => {
    if (!validationSchema) {
      throw new Error('You need to provide a schema to validate.');
    }

    try {
      await validationSchema
        .validate(values, { abortEarly: false })
        .catch(errors => formatSlattErrors<T>(errors, setErrors));
    } catch (error) {
      console.error(error);
    }
  }, [validationSchema, values]);

  return {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleReset,
    handleSubmit,
  };
};

export default useSlatt;
