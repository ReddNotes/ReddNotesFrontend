// ! modules
import { useState } from 'react';

// ? styles
import s from './Comments.module.css';

// ? assets
import sendIcon from './../../assets/icon/send.svg';

// ? components
import Comment from './../Comment/Comment';

export default function Comments({ note, user, users }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();
    const diff = Math.floor((currentDate - date) / 1000);

    const intervals = {
      year: 31536_000,
      month: 2592_000,
      week: 604800,
      day: 86400,
      hour: 3_600,
      minute: 60,
      second: 1,
    };

    for (let key in intervals) {
      const interval = Math.floor(diff / intervals[key]);
      if (interval >= 1) {
        return interval + ' ' + key + (interval === 1 ? '' : 's') + ' ago';
      }
    }
    return 'Just now';
  }

  // ? constants

  const emptyValue = {
    [`${note._id}_note_comment`]: '',
  };

  // ? useState
  const [inputValue, setInputValue] = useState(emptyValue);
  const [isFormActive, setFormActive] = useState(false);

  // ? functions
  function handleInput(e) {
    const { id, value, form } = e.target;

    setInputValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    setFormActive(form.checkValidity());
  }

  function autoResize(e) {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit({
      noteId: note._id,
      value: inputValue[`${note._id}_note_comment`],
    });
    setInputValue(emptyValue);
    setFormActive(false);
  }

  return (
    <section className={s.main}>
      {note.comments.length !== 0 ? (
        note.comments.map((comment) => (
          <Comment
            note={note}
            user={user}
            users={users}
            comment={comment}
            key={comment._id}
          />
        ))
      ) : (
        <h4 className={`text text_color_second label-second ${s.no_comments}`}>
          There are no comments under this post for the moment
        </h4>
      )}

      {/*  */}
      <form id={`${note._id}_note_form`} onSubmit={onSubmit} className={s.form}>
        <div className={s.avatar}>
          <img
            className={s.avatar__img}
            src={user.avatar}
            alt={`${user.nickname} avatar`}
          />
        </div>
        <textarea
          className={`text label-second ${s.textarea}`}
          required
          rows='1'
          onInput={autoResize}
          onChange={handleInput}
          id={`${note._id}_note_comment`}
          placeholder='Write a comment...'
          value={inputValue[`${note._id}_note_comment`]}
        />
        {/* Todo implement comment handler */}
        <button
          disabled={!isFormActive}
          className={`button ${s.submit}`}
          type='submit'
        >
          <img className={s.submit__icon} src={sendIcon} alt='Send icon' />
        </button>
      </form>
    </section>
  );
}
