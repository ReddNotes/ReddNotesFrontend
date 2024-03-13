// ! modules
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

// ? styles
import s from './NewNote.module.css';

// ? assets
import sendIcon from './../../assets/icon/send.svg';

// ? utils
import { generateErrorMessage } from '../../utils/utils';

export default function NewNote({ user, handleCreateNote }) {
  // ? constants
  const emptyValue = {
    'create-note-title': '',
    'create-note-description': '',
  };

  // ? useState
  const [inputValue, setInputValue] = useState(emptyValue);
  const [errorValue, setErrorValue] = useState(emptyValue);
  const [isFormActive, setFormActive] = useState(false);

  // ? functions
  // create note
  function onSubmit(e) {
    e.preventDefault();
    handleCreateNote({
      title: inputValue['create-note-title'].trim(),
      description: inputValue['create-note-description'].trim(),
    });
    setInputValue(emptyValue);

    setTimeout(() => {
      const textarea = document.getElementById('create-note-description');
      textarea.style.height = '92px';
    }, 10);
  }

  // change input
  function handleInput(e) {
    const { id, value, form } = e.target;

    setInputValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    const _error = generateErrorMessage(e.target.validity);

    setErrorValue((prevState) => ({
      ...prevState,
      [id]: !!_error ? _error : !value.trim() && 'Empty string is not valid',
    }));

    setFormActive(
      !!inputValue['create-note-description'].trim() &&
        !!inputValue['create-note-title'].trim() &&
        form.checkValidity(),
    );
  }

  function autoResize(e) {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  return (
    <section className={s.main}>
      <form onSubmit={onSubmit} className={s.form}>
        {/* header */}
        <header className={s.header}>
          <div className={`${s.container} ${s.container_size_max}`}>
            <NavLink
              to={`/user/${user._id}`}
              title='click to go to profile'
              className={`link ${s.header_link} ${s.owner}`}
            >
              <img
                className={s.avatar}
                src={user.avatar}
                alt={`Avatar of ${user.nickname}`}
              />
            </NavLink>
            <input
              id='create-note-title'
              className={`text title-third ${s.title}`}
              value={inputValue['create-note-title']}
              placeholder='Type title'
              onChange={handleInput}
              required
            />
            <span className='text text_color_accent detail'>
              {errorValue['create-note-title']}
            </span>
          </div>
        </header>

        {/* description */}
        <div className={s.value}>
          <textarea
            id='create-note-description'
            className={'text label-second'}
            value={inputValue['create-note-description']}
            placeholder='Write your note here'
            onChange={handleInput}
            onInput={autoResize}
            required
          />
        </div>

        {/* footer */}
        <footer className={s.footer}>
          <div className={s.container}>
            <span className='text text_color_accent detail'>
              {errorValue['create-note-description']}
            </span>
          </div>

          <div className={s.container}>
            {/* send */}
            <button disabled={!isFormActive} className='button' type='submit'>
              <img src={sendIcon} alt='Send icon' />
            </button>
          </div>
        </footer>
      </form>
    </section>
  );
}
