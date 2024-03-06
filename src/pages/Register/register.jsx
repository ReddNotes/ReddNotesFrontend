// ? components
import AuthForm from '../../components/AuthForm/AuthForm';

export default function Register() {
  return (
    <AuthForm
      title={'Welcome to ReddNotes'}
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
        text: 'Register',
        function: (e) => {
          e.preventDefault();
          console.log('submit');
        },
      }}
      link={{
        sentence: 'Already have account ?',
        text: 'Login',
        href: '/login',
      }}
    />
  );
}
