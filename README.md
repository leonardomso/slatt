<div align="center">
<h1 align="center">
🐍 Slatt
</h1>
<p align="center">
  Another form library to use with React? Oh, please!
</p>
</div>

<p align="center">
<a href="https://travis-ci.org/reakit/reakit"><img alt="Build Status" src="https://img.shields.io/travis/reakit/reakit/master.svg?style=flat-square" /></a>
</p>

<hr />

## Another form library? Oh, please!

I'm just trying to understand how to use custom hooks to deal with forms in React, I was boring so I thought "why not create another form library?".

Feel free to contribute though, the next step of this library is to add validate, find a way that we can validate the object passed as `initialValues`.

## Getting Started

To get it started, add `slatt` to your project:

```
npm install --save slatt
```

This library requires `react@^16.8.0` as a peer dependency.

## Usage

```jsx
import React from "react";
import { useSlatt } from "slatt";

const  initialValues  =  {
  name: "",
  lastName: "",
  age:  0
};

const App = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  } = useSlatt({
    initialValues,
    onSubmit: values => console.log({ values })
  });

  return  (
    <form onSubmit={handleSubmit} className="App">
      <h1>Custom Forms with Hooks</h1>
      
      <label>Name</label>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={values.name}
      />
      <br />
      
      <label>Lastname</label>
      <input
        type="text"
        name="lastName"
        onChange={handleChange}
        value={values.lastName}
      />
      <br />
      
      <label>Age</label>
      <input
        type="number"
        name="age"
        onChange={handleChange}
        value={values.age}
      />
      <br />
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
```
