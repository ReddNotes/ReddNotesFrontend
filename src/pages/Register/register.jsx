// Register.jsx

// ! modules
import { useState } from 'react';

// ? components
import AuthForm from '../../components/AuthForm/AuthForm';

export default function Register({ handleSubmit, error }) {
  const emptyValue = {
    'register-nickname': '',
    'register-password': '',
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
    handleSubmit({
      nickname: inputValue['register-nickname'],
      password: inputValue['register-password'],
    });
    setInputValue(emptyValue);
  }

  return (
    <AuthForm
      title={'Welcome to ReddNotes'}
      onChange={handleInput}
      fields={[
        {
          id: 'register-nickname',
          name: 'Nickname',
          value: inputValue['register-nickname'],
          type: 'text',
          placeholder: 'Pizza Guy',
        },
        {
          id: 'register-password',
          name: 'Password',
          value: inputValue['register-password'],
          type: 'password',
          placeholder: 'Type strong password',
        },
      ]}
      submit={{
        text: 'Register',
        function: onSubmit,
      }}
      link={{
        sentence: 'Already have account ?',
        text: 'Login',
        href: '/login',
      }}
      error={error}
    />
  );
}
