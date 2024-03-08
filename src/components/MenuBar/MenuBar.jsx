// ! modules
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

// ? styles
import s from './MenuBar.module.css';

// ? assets
import fireLogo from './../../assets/ReddNotes_logo_fire.svg';
import notesIcon from './../../assets/icon/notes.svg';
import userIcon from './../../assets/icon/user.svg';
import favoriteIcon from './../../assets/icon/star_empty.svg';
import settingsIcon from './../../assets/icon/settings.svg';
import notesActiveIcon from './../../assets/icon/notes_red.svg';
import userActiveIcon from './../../assets/icon/user_red.svg';
import favoriteActiveIcon from './../../assets/icon/star_red.svg';
import settingsActiveIcon from './../../assets/icon/settings_red.svg';
import logoutIcon from './../../assets/icon/logout.svg';

export default function MenuBar({
  handlerLogout,
  pathname,
  isAuthorized,
  user,
}) {
  const _id = 'menubar-navigation-line';

  const [line, setLine] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  // 1 * size - ((size - 48px) / 2)
  const _size = {
    big: 64,
    small: 60,
  };

  function _countPosition(count, size) {
    return `${count * size + (size - 48) / 2}px`;
  }

  const position = {
    big: {
      '/': _countPosition(0, _size.big),
      '/user': _countPosition(1, _size.big),
      '/favorite': _countPosition(2, _size.big),
      '/settings': _countPosition(3, _size.big),
    },
    small: {
      '/': _countPosition(0, _size.small),
      '/user': _countPosition(1, _size.small),
      '/favorite': _countPosition(2, _size.small),
      '/settings': _countPosition(3, _size.small),
    },
  };

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  });

  useEffect(() => {
    setLine(document.getElementById(_id));
  }, []);

  useEffect(() => {
    if (!line) return;

    if (width > 440) {
      line.style.top = position.big[pathname];
      line.style.left = 0;
    } else {
      line.style.left = position.small[pathname];
      line.style.top = 0;
    }
  }, [line, pathname, width]);

  return (
    <article className={s.main}>
      <div className={s.container}>
        <div className={`${s.item} ${s.item_type_logo}`}>
          <img className={s.logo} src={fireLogo} alt='Redd Notes logo' />
        </div>

        <nav className={s.navigation}>
          <div id={_id} className={s.line} />
          {/* main */}
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              `link ${s.item} ${isActive && s.link_type_current}`
            }
          >
            {/* // todo make logic with notification <div id={notificationOnNotes ? s.current : ''} /> */}
            <img
              src={pathname === '/' ? notesActiveIcon : notesIcon}
              alt='Notes Logo'
            />
          </NavLink>

          {/* user profile */}
          <NavLink
            to={`/user/${user._id}`}
            className={({ isActive }) => {
              return `link ${s.item} ${isActive && s.link_type_current}`;
            }}
          >
            {/* // todo make logic with notification <div id={notificationOnUser ? s.current : ''} /> */}
            <img
              src={pathname === '/user' ? userActiveIcon : userIcon}
              alt='User Logo'
            />
          </NavLink>

          {/* favorite */}
          <NavLink
            to={'/favorite'}
            className={({ isActive }) => {
              return `link ${s.item} ${isActive && s.link_type_current}`;
            }}
          >
            {/* // todo make logic with notification <div id={notificationOnFavorites ? s.current : ''} /> */}
            <img
              src={pathname === '/favorite' ? favoriteActiveIcon : favoriteIcon}
              alt='Favorite Logo'
            />
          </NavLink>

          {/* settings */}
          <NavLink
            to={'/settings'}
            className={({ isActive }) => {
              return `link ${s.item} ${isActive && s.link_type_current}`;
            }}
          >
            {/* // todo make logic with notification <div id={notificationOnSettings ? s.current : ''} /> */}
            <img
              src={pathname === '/settings' ? settingsActiveIcon : settingsIcon}
              alt='Settings Logo'
            />
          </NavLink>
        </nav>
      </div>

      <div className={s.item}>
        <button
          disabled={!isAuthorized}
          type='button'
          onClick={handlerLogout}
          className='button'
        >
          <img src={logoutIcon} alt='Logout Logo' />
        </button>
      </div>
    </article>
  );
}
