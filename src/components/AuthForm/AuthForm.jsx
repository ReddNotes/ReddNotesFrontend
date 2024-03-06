// AuthForm.jsx

// ! modules
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

// ? assets
import fullLogo from './../../assets/ReddNotes_logo_full.svg';

// ? style
import s from './AuthForm.module.css';

export default function AuthForm({
  title = 'do not forgot to change in production',
  onChange,
  submit = {
    text: 'Submit form',
    function: (e) => {
      e.preventDefault();
      console.log('submit');
    },
  },
  fields = [
    {
      id: 'auth_input',
      value: 'input value',
      name: 'First input',
      type: 'text',
      require: true,
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
  // ? useState
  const [isSubmitButtonActive, setSubmitButtonActive] = useState(false);

  // ? useEffect
  useEffect(() => {
    setSubmitButtonActive(true);
    for (let i = 0; i < fields.length; i++) {
      const inp = fields[i];

      if (!inp.value.trim()) {
        setSubmitButtonActive(false);
      }
    }
  }, [fields]);

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
                    id={inp.id}
                    onChange={onChange}
                    value={inp.value}
                    className={s.field__input}
                    type={inp.type}
                    placeholder={inp.placeholder}
                  />
                </div>
              );
            })}
          </div>

          <p className={s.error}>{error}</p>

          <button
            disabled={!isSubmitButtonActive}
            type='submit'
            className={`button ${s.submit_button}`}
          >
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
