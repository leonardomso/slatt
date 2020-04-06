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

        <Input
          type="text"
          name="password"
          value={values.password}
          onChange={handleChange}
        />

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
