// ! modules
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ? styles
import s from './Note.module.css';

// ? assets
import fire_empty from './../../assets/icon/fire_empty.svg';
import fire_full from './../../assets/icon/fire_full.svg';
import star_empty from './../../assets/icon/star_empty.svg';
import star_full from './../../assets/icon/star_full.svg';
import comment from './../../assets/icon/comment.svg';

export default function Note({ isAuthorized, handleChangeReaction, note }) {
  const [isReactionActive, setReactionActive] = useState(note.isReactionActive);
  const [isSavedFavorites, setSavedFavorites] = useState(note.isSavedFavorites);

  const date = new Date(note.creationDate);

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const formattedDate = `${day}/${month}/${year}`;

  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const formattedTime = `${hours}:${minutes}`;

  // ?
  useEffect(() => {
    setReactionActive(note.isReactionActive);
    setSavedFavorites(note.isSavedFavorites);
  }, [note]);

  // ? functions

  // ?
  function toggleStar() {
    setSavedFavorites(!isSavedFavorites);
  }

  // change reaction
  function handleClickReaction() {
    handleChangeReaction(
      {
        noteId: note._id,
      },
      isReactionActive ? 'delete' : 'set',
    );
  }

  return (
    <article className={s.main}>
      {/* top */}
      <header className={s.header}>
        <div className={s.container}>
          <NavLink className={`link ${s.header_link}`}>
            <img
              className={s.avatar}
              src={note.user.avatar}
              alt={`avatar of ${note.user.nickname}`}
            />
          </NavLink>
          <h2 className={s.title}>{note.title}</h2>
        </div>
        {/* time */}
        <div className={s.header_created}>
          <p className={s.time}>{formattedDate}</p>
          <p className={s.time}>{formattedTime}</p>
        </div>
      </header>
      {/* text */}
      <div className={s.value}>
        <p className={s.text}>{note.description}</p>
      </div>

      {/* bottom */}
      <footer className={s.footer}>
        <div className={s.container}>
          <div className={s.reaction}>
            <p
              className={`${s.text} ${s.reaction_count} ${
                isReactionActive && s.reaction_count_active_active
              }`}
            >
              {note.likes.length}
            </p>
            <button
              disabled={!isAuthorized}
              className='button'
              onClick={handleClickReaction}
            >
              <img
                src={isReactionActive ? fire_full : fire_empty}
                alt='action icon'
              />
            </button>
          </div>

          <button disabled={!isAuthorized} className='button'>
            <img src={comment} alt='comment icon' />
          </button>
        </div>

        <button
          disabled={!isAuthorized}
          className='button'
          onClick={toggleStar}
        >
          <img
            src={isSavedFavorites ? star_full : star_empty}
            alt='star icon'
          />
        </button>
      </footer>
    </article>
  );
}
