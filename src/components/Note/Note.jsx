// ! modules
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

// ? styles
import s from './Note.module.css';

// ? assets
import fire_empty from './../../assets/icon/fire_empty.svg';
import fire_full from './../../assets/icon/fire_full.svg';
import star_empty from './../../assets/icon/star_empty.svg';
import star_full from './../../assets/icon/star_full.svg';
import comment from './../../assets/icon/comment.svg';

export default function Note({ note }) {
  const [isFireActive, setFireActive] = useState(false);
  const [isStarActive, setStarActive] = useState(false);

  function toggleFire() {
    setFireActive(!isFireActive);
  }

  function toggleStar() {
    setStarActive(!isStarActive);
  }

  const date = new Date(note.creationDate);

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const formattedDate = `${day}/${month}/${year}`;

  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const formattedTime = `${hours}:${minutes}`;

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
                isFireActive && s.reaction_count_active_active
              }`}
            >
              {note.likes.lenght || 0}
            </p>
            <button className='button' onClick={toggleFire}>
              <img
                src={isFireActive ? fire_full : fire_empty}
                alt='action icon'
              />
            </button>
          </div>

          <button className='button'>
            <img src={comment} alt='comment icon' />
          </button>
        </div>

        <button className='button' onClick={toggleStar}>
          <img src={isStarActive ? star_full : star_empty} alt='star icon' />
        </button>
      </footer>
    </article>
  );
}
