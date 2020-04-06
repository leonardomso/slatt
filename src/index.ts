import { useCallback, useState, useEffect, useRef } from 'react';

import { SlattValues, SlattArguments, SlattErrors } from './types';

import { validateSlattSchema, formatSlattErrors } from './utils';

export const useSlatt = ({
  initialValues,
  onSubmit,
  validationSchema,
}: SlattArguments) => {
  const [values, setValues] = useState<SlattValues>(initialValues || {});
  const [errors, setErrors] = useState<SlattErrors<SlattValues>>({});
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const formMounted = useRef<boolean>(true);

  useEffect(() => {
    formMounted.current = true;

    return () => {
      formMounted.current = false;
    };
  }, []);

  // Validate on mount.
  // useEffect(() => {
  //   if (formMounted.current === true) {
  //     onValidateSchema(initialValues);
  //   }
  // }, [formMounted, onValidateSchema]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      const isAsync = validateSlattSchema<SlattValues>(
        validationSchema,
        values
      );

      try {
        const validationMethod = isAsync ? 'validate' : 'validateSync';
        handleResetErrors();
        if (isAsync) setIsValidating(true);
        await validationSchema[validationMethod](values, { abortEarly: false });
        resolve();
      } catch (error) {
        setErrors(formatSlattErrors<SlattValues>(error));
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
};
