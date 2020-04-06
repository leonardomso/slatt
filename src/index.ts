import { useCallback, useState } from 'react';

import { SlattState, SlattConfig, SlattErrors } from './types';

import { validateSlattSchema, formatSlattErrors } from './utils';

function useSlatt<Values>({
  initialValues,
  onSubmit,
  validationSchema,
}: SlattConfig<Values>): SlattState<Values> {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<SlattErrors<Values>>({});
  const [isValidating, setIsValidating] = useState<boolean>(false);
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
    [onSubmit, values]
  );

  const onValidateSchema = useCallback(() => {
    if (!validationSchema) {
      throw new Error('You need to provide a schema to validate.');
    }

    return new Promise(async (resolve, reject) => {
      const isAsync = validateSlattSchema<Values>(validationSchema, values);

      try {
        const validationMethod = isAsync ? 'validate' : 'validateSync';
        handleResetErrors();
        if (isAsync) setIsValidating(true);
        await validationSchema[validationMethod](values, { abortEarly: false });
        resolve();
      } catch (error) {
        setErrors(formatSlattErrors<Values>(error));
        reject();
      } finally {
        if (isAsync) setIsValidating(false);
      }
    });
  }, [validationSchema, values, handleResetErrors, setErrors]);

  return {
    values,
    errors,
    isValidating,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleReset,
    handleSubmit,
  };
}

export default useSlatt;
