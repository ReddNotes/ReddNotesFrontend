// ! modules
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

// ? styles
import s from './MenuBar.module.css';

// ? assets
import fireLogo from './../../assets/ReddNotes_logo_fire.svg';
import notesIcon from './../../assets/icon/notes.svg';
import userIcon from './../../assets/icon/user.svg';
import settingsIcon from './../../assets/icon/settings.svg';
import notesActiveIcon from './../../assets/icon/notes_red.svg';
import userActiveIcon from './../../assets/icon/user_red.svg';
import settingsActiveIcon from './../../assets/icon/settings_red.svg';
import logoutIcon from './../../assets/icon/logout.svg';

export default function MenuBar({ handlerLogout, pathname, isAuthorized }) {
  const _id = 'menubar-navigation-line';

  const [line, setLine] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  const position = {
    '/': '8px',
    '/profile': '72px',
    '/settings': '136px',
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
      line.style.top = position[pathname];
      line.style.left = 0;
    } else {
      line.style.left = position[pathname];
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
            {/* // todo make logic with notification <div id={notifOnNotes ? s.current : ''} /> */}
            <img
              src={pathname === '/' ? notesActiveIcon : notesIcon}
              alt='Notes Logo'
            />
          </NavLink>

          {/* profile */}
          <NavLink
            to={'/profile'}
            className={({ isActive }) => {
              return `link ${s.item} ${isActive && s.link_type_current}`;
            }}
          >
            {/* // todo make logic with notification <div id={notifOnNotes ? s.current : ''} /> */}
            <img
              src={pathname === '/profile' ? userActiveIcon : userIcon}
              alt='User Logo'
            />
          </NavLink>

          {/* settings */}
          <NavLink
            to={'/settings'}
            className={({ isActive }) => {
              return `link ${s.item} ${isActive && s.link_type_current}`;
            }}
          >
            {/* // todo make logic with notification <div id={notifOnNotes ? s.current : ''} /> */}
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
