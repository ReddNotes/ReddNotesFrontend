// AuthForm.jsx

// ! modules
import { NavLink } from 'react-router-dom';

// ? assets
import fullLogo from './../../assets/ReddNotes_logo_full.svg';

// ? style
import s from './AuthForm.module.css';

export default function AuthForm({
  title = 'do not forgot to change in production',
  submit = {
    text: 'Submit form',
    function: (e) => {
      e.preventDefault();
      console.log('submit');
    },
  },
  fields = [
    {
      name: 'First input',
      type: 'text',
      placeholder: 'type here something',
    },
  ],
  link = {
    sentence: 'Go to other',
    text: 'page',
    href: '/',
  },
  error = 'Something was wrong...',
}) {
  return (
    <div className={s.main}>
      <div className={s.container}>
        <img className={s.logo} src={fullLogo} alt='ReddNotes Logo' />
        <h1 className={s.title}>{title}</h1>

        <form onSubmit={submit.function} className={s.form}>
          <div className={s.inputs}>
            {fields.map((inp, index) => {
              return (
                <div key={index} className={s.field}>
                  <h2 className={s.field__name}>{inp.name}</h2>
                  <input
                    className={s.field__input}
                    type={inp.type}
                    placeholder={inp.placeholder}
                  />
                </div>
              );
            })}
          </div>

          <p className={s.error}>{error}</p>

          <button type='submit' className={`button ${s.submit_button}`}>
            {submit.text}
          </button>

          <p className={s.bottom_text}>
            {link.sentence + ' '}
            <NavLink className='link' to={link.href}>
              {link.text}
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
