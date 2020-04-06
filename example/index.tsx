import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Yup from 'yup';

import { useSlatt } from '../src/index';

const validationSchema = {
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password min length is 8'),
};

const App = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values: Object) => {
    console.log('values -> ', values);
  };

  const {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleReset,
    handleSubmit,
  } = useSlatt({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1>Slatt Example</h1>
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      {errors.email && <h1>{errors.email}</h1>}
      <input
        type="text"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      {errors.password && <h1>{errors.password}</h1>}
      <button type="reset" onClick={handleReset}>
        Reset
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
