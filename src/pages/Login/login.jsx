import AuthForm from '../../components/AuthForm/AuthForm';

export default function Login() {
  return (
    <AuthForm
      title={'Welcome back user'}
      fields={[
        {
          name: 'Nickname',
          type: 'text',
          placeholder: 'Pizza Guy',
        },
        {
          name: 'Password',
          type: 'password',
          placeholder: 'Type strong password',
        },
      ]}
      submit={{
        text: 'Login',
        function: (e) => {
          e.preventDefault();
          console.log('submit');
        },
      }}
      link={{
        sentence: 'Do not have any account yet ?',
        text: 'Register',
        href: '/register',
      }}
    />
  );
}
