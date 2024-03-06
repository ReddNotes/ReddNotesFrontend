// Login.jsx

// ! modules
import { useState } from 'react';

// ? components
import AuthForm from '../../components/AuthForm/AuthForm';

// ? utils
import { generateErrorMessage } from '../../utils/utils';

export default function Login({ handleSubmit, error }) {
  const emptyValue = {
    'login-nickname': '',
    'login-password': '',
  };

  // ? useState
  const [inputValue, setInputValue] = useState(emptyValue);
  const [errorValue, setErrorValue] = useState(emptyValue);
  const [isFormActive, setFormActive] = useState(false);

  // ? functions
  function handleInput(e) {
    const { id, value, form } = e.target;

    setInputValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    setErrorValue((prevState) => ({
      ...prevState,
      [id]: generateErrorMessage(e.target.validity),
    }));

    setFormActive(form.checkValidity());
  }

  function onSubmit(e) {
    e.preventDefault();
    setInputValue({ ...emptyValue });
    handleSubmit({
      nickname: inputValue['login-nickname'],
      password: inputValue['login-password'],
    });
  }

  return (
    <AuthForm
      title={'Welcome back user'}
      onChange={handleInput}
      isFormActive={isFormActive}
      fields={[
        {
          id: 'login-nickname',
          name: 'Nickname',
          value: inputValue['login-nickname'],
          type: 'text',
          required: true,
          error: errorValue['login-nickname'],
          placeholder: 'Pizza Guy',
        },
        {
          id: 'login-password',
          name: 'Password',
          value: inputValue['login-password'],
          type: 'password',
          required: true,
          error: errorValue['login-password'],
          placeholder: 'Type strong password',
        },
      ]}
      submit={{
        text: 'Login',
        function: onSubmit,
      }}
      link={{
        sentence: 'Do not have any account yet ?',
        text: 'Register',
        href: '/register',
      }}
      error={error}
    />
  );
}
