import { useState, useEffect, useRef } from "react";

interface IParameters {
  initialValues: any;
  onSubmit: (values: any) => any;
}

const useSlatt = ({ initialValues, onSubmit }: IParameters) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [onSubmitting, setOnSubmitting] = useState<boolean>(false);
  const [onBlur, setOnBlur] = useState<boolean>(false);

  const formRendered = useRef(true);

  useEffect(() => {
    if (!formRendered.current) {
      setValues(initialValues);
      setErrors({});
      setTouched({});
      setOnSubmitting(false);
      setOnBlur(false);
    }
    formRendered.current = false;
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;
    event.persist();
    setValues((values: any) => ({ ...values, [name]: value }));
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name } = target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event) event.preventDefault();
    setErrors({ ...errors });
    onSubmit({ values });
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit
  };
};

export default useSlatt;