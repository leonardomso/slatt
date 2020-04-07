import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Yup from 'yup';

import useSlatt from '../src/index';

import {
  AppContainer,
  AppTitle,
  FormContainer,
  ButtonsContainer,
  Button,
  Input,
} from './index.styles';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password min length is 8'),
});

const App = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values: any) => {
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
    <AppContainer>
      <FormContainer onSubmit={handleSubmit}>
        <AppTitle>🐍 Slatt Example</AppTitle>

        <Input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email ? <h1>{errors.email}</h1> : null}

        <Input
          type="text"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password ? <h1>{errors.password}</h1> : null}

        <ButtonsContainer>
          <Button type="reset" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </ButtonsContainer>
      </FormContainer>
    </AppContainer>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
