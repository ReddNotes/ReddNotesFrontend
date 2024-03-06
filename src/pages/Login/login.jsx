// Login.jsx

// ! modules
import { useState } from 'react';

// ? components
import AuthForm from '../../components/AuthForm/AuthForm';

export default function Login({ handleSubmit, error }) {
  const emptyValue = {
    'login-nickname': '',
    'login-password': '',
  };

  // ? useState
  const [inputValue, setInputValue] = useState(emptyValue);

  function handleInput(e) {
    const { id, value } = e.target;

    setInputValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));
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
      fields={[
        {
          id: 'login-nickname',
          name: 'Nickname',
          value: inputValue['login-nickname'],
          type: 'text',
          placeholder: 'Pizza Guy',
        },
        {
          id: 'login-password',
          name: 'Password',
          value: inputValue['login-password'],
          type: 'password',
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
