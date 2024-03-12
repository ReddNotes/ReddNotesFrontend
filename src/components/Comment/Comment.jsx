// ! modules
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

// ? styles
import s from './Comment.module.css';

// ? assets
import reactionIcon from './../../assets/icon/fire_empty.svg';
import reactionFillIcon from './../../assets/icon/fire_full.svg';

export default function Comment({ note, user, users, comment }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();
    const diff = Math.floor((currentDate - date) / 1000); // Différence en secondes arrondie

    const intervals = {
      year: 31536_000,
      month: 2592_000,
      week: 604800,
      day: 86400,
      hour: 3_600,
      min: 60,
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

  // ? useState
  // owner of comment
  const [owner, setOwner] = useState(
    users.find((u) => u._id === comment.owner),
  );
  const [isOwner, setIsOwner] = useState(user._id === comment.owner);

  // ? useEffects

  useEffect(() => {
    setOwner(users.find((u) => u._id === comment.owner));
    setIsOwner(user._id === comment.owner);
  }, [users, user]);

  // ? functions

  return (
    <article className={`${s.main} ${isOwner && s.owner}`}>
      {/* top */}
      <header className={s.header}>
        <h3 className='text text_color_second detail'>
          {isOwner ? 'You' : owner.nickname}
        </h3>
      </header>

      {/* main */}
      <div className={s.container}>
        {!isOwner && (
          <NavLink to={`/user/${owner._id}`} className={`link ${s.profile}`}>
            <img
              className={s.profile_img}
              src={owner.avatar}
              alt={`${owner.nickname} avatar`}
            />
          </NavLink>
        )}
        <div className={s.comment}>
          <p className='text label-second'>{comment.value}</p>
        </div>
      </div>

      {/* bottom */}
      <footer className={s.footer}>
        <h5 className='text text_color_second detail'>
          {formatDate(comment.creationDate)}
        </h5>
        <div className={s.reaction}>
          <button type='button' className='button'>
            <img
              className={s.icon}
              src={true ? reactionIcon : reactionFillIcon}
              alt='Reaction icon'
            />
          </button>
          <p className={'text text_color_second label-third'}>
            {comment.likes.length}
          </p>
        </div>
      </footer>
    </article>
  );
}
