// Register.jsx

// ! modules
import { useState } from 'react';

// ? components
import AuthForm from '../../components/AuthForm/AuthForm';

// ? utils
import { generateErrorMessage } from '../../utils/utils';

export default function Register({ handleSubmit, error }) {
  const emptyValue = {
    'register-nickname': '',
    'register-password': '',
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
      isFormActive={isFormActive}
      fields={[
        {
          id: 'register-nickname',
          name: 'Nickname',
          value: inputValue['register-nickname'],
          type: 'text',
          required: true,
          error: errorValue['register-nickname'],
          placeholder: 'Pizza Guy',
        },
        {
          id: 'register-password',
          name: 'Password',
          value: inputValue['register-password'],
          type: 'password',
          required: true,
          error: errorValue['register-password'],
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
