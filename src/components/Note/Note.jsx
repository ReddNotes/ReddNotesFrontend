// ! modules
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ? styles
import s from './Note.module.css';

// ? assets
import reactionIcon from './../../assets/icon/fire_empty.svg';
import reactionFillIcon from './../../assets/icon/fire_full.svg';
import favoriteIcon from './../../assets/icon/star_empty.svg';
import favoriteFillIcon from './../../assets/icon/star_full.svg';
import commentIcon from './../../assets/icon/comment.svg';
import redCommentIcon from './../../assets/icon/comment_red.svg';

// ? pages
import Comment from '../Comment/Comment';

export default function Note({
  openPopupPicture,
  isAuthorized,
  handleChangeReaction,
  handleAddOrDeleteFavorites,
  note,
  user,
  users
}) {
  const [isReactionActive, setReactionActive] = useState(note.isReactionActive);
  const [isSavedFavorites, setSavedFavorites] = useState(note.isSavedFavorites);
  const [isOwner, setOwner] = useState(user._id === note.owner);
  const [showComment, setShowComment] = useState(false);

  const date = new Date(note.creationDate);

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const currentDate = new Date();
  const formattedDate =
    currentDate.getDate() === date.getDate()
      ? 'today'
      : currentDate.getDate() === date.getDate() + 1
      ? 'yesterday'
      : `${day}/${month}/${year}`;

  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const formattedTime = `${hours}:${minutes}`;

  // ?
  useEffect(() => {
    setReactionActive(note.isReactionActive);
    setSavedFavorites(note.isSavedFavorites);
    setOwner(user._id === note.owner);
  }, [note, user]);

  // ? functions

  // change reaction
  function handleClickReaction() {
    handleChangeReaction(
      {
        noteId: note._id,
      },
      isReactionActive ? 'delete' : 'set',
    );
  }

  // add or delete note to/from favorite
  function handleClickFavorite() {
    handleAddOrDeleteFavorites(
      {
        noteId: note._id,
      },
      isSavedFavorites ? 'delete' : 'add',
    );
  }

  return (
    <article className={s.main}>
      {/* header */}
      <header className={s.header}>
        <div className={s.container}>
          <NavLink
            to={`/user/${note.owner}`}
            className={`link ${s.header_link} ${isOwner && s.owner}`}
          >
            <img
              className={s.avatar}
              src={note.user.avatar}
              alt={`avatar of ${note.user.nickname}`}
            />
          </NavLink>
          <h2 className={`text title-third ${s.title}`}>{note.title}</h2>
        </div>
        {/* time */}
        <div className={s.header_created}>
          <p className={`text text_color_second detail ${s.time}`}>
            {formattedDate}
          </p>
          <p className={`text text_color_second detail ${s.time}`}>
            {formattedTime}
          </p>
        </div>
      </header>
      {/* text */}
      <div className={s.value}>
        <p className={'text label-second'}>{note.description}</p>
      </div>

      {/* footer */}
      <footer className={s.footer}>
        <div className={s.container}>
          <div className={s.reaction}>
            <p
              className={`text title-third  text_color_second ${
                isReactionActive && 'text_color_accent'
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
                src={isReactionActive ? reactionFillIcon : reactionIcon}
                alt='action icon'
              />
            </button>
          </div>

          <button disabled={!isAuthorized} onClick={() => setShowComment(!showComment)} className='button'>
            <img src={showComment ? redCommentIcon : commentIcon} alt='comment icon' />
          </button>
        </div>

        <button
          disabled={!isAuthorized}
          className='button'
          onClick={handleClickFavorite}
        >
          <img
            src={isSavedFavorites ? favoriteFillIcon : favoriteIcon}
            alt='star icon'
          />
        </button>
      </footer>
      {showComment &&
      <Comment
        note={note}
        user={user}
        users={users}
      />}
    </article>
  );
}
