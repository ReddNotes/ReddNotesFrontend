// ! modules
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

export default function MenuBar() {
  const currentPage = window.location.pathname;

  return (
    <article className={s.main}>
      <div>
        <div className={`${s.item} ${s.item_type_logo}`}>
          <img className={s.logo} src={fireLogo} alt='Redd Notes logo' />
        </div>

        <nav className={s.navigation}>
          {/* main */}
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              `link ${s.item} ${isActive && s.link_type_current}`
            }
          >
            {/* // todo make logic with notification <div id={notifOnNotes ? s.current : ''} /> */}
            <img
              src={currentPage === '/' ? notesActiveIcon : notesIcon}
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
              src={currentPage === '/profile' ? userActiveIcon : userIcon}
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
              src={
                currentPage === '/settings' ? settingsActiveIcon : settingsIcon
              }
              alt='Settings Logo'
            />
          </NavLink>
        </nav>
      </div>

      <div className={s.item}>
        <button className='button'>
          <img src={logoutIcon} alt='Logout Logo' />
        </button>
      </div>
    </article>
  );
}
