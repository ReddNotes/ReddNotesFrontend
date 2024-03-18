// ! modules
import { useEffect, useState } from 'react';

// ? style
import s from './Settings.module.css';

// ? utils
import { LOCAL_STORAGE_VARIABLES } from './../../utils/constants';

export default function Settings({
  handleSettingsUpdateSubmit,
  setCurrentUser,
  isAuthorized,
  handleLogin,
  user,
}) {
  // ? useStates
  const [loggedAccounts, setLoggedAccounts] = useState([]);

  // ? useEffects
  useEffect(() => {
    setLoggedAccounts(
      JSON.parse(localStorage.getItem('ReddNotes.accounts')) || [],
    );
  }, [user, isAuthorized]);

  // ? functions

  // change to dark or light theme
  function changeTheme() {
    const newTheme = user.settings.theme === 'dark' ? 'light' : 'dark';
    if (!isAuthorized) {
      localStorage.setItem('ReddNotes.theme', newTheme);
    } else {
      handleSettingsUpdateSubmit({
        theme: newTheme,
        notification: user.settings.notification,
      });
    }

    const _root = document.getElementById('root');
    const _html = document.querySelector('html');

    _root.setAttribute('data-theme', newTheme);
    _html.setAttribute('data-theme', newTheme);

    const _user = { ...user };

    _user.settings.theme = newTheme;

    setCurrentUser(_user);
  }

  // turn on/off notification
  function changeNotification() {
    const newNotification = !user.settings.notification;

    if (!isAuthorized) {
      localStorage.setItem('ReddNotes.notification', newNotification);
    } else {
      handleSettingsUpdateSubmit({
        theme: user.settings.theme,
        notification: newNotification,
      });
    }

    const _user = { ...user };

    _user.settings.notification = newNotification;

    setCurrentUser(_user);
  }

  // change account
  function changeUser({ token }) {
    handleLogin(token);
  }

  return (
    <section className={s.global}>
      <article className={s.main}>
        <header className={s.header}>
          <h1 className='text title-second'>Settings</h1>
        </header>

        <article className={s.topic}>
          {/* theme switcher */}
          <div className={s.setting}>
            <h3 className='text label-first'>Dark theme</h3>

            <input
              title={`Now theme is ${user.settings.theme}`}
              type='checkbox'
              checked={user.settings.theme === 'dark'}
              className={`button ${s.switch}`}
              onChange={changeTheme}
            />
          </div>
          <div className={s.setting}>
            <h3 className='text label-first'>Notification</h3>

            <input
              type='checkbox'
              title={`Now notification is turn ${
                user.settings.notification ? 'on' : 'off'
              }`}
              checked={user.settings.notification}
              className={`button ${s.switch}`}
              onChange={changeNotification}
            />
          </div>
        </article>

        {/* Choose account */}
        <article className={s.topic}>
          <h2 className={`text label-first ${s.topic__title}`}>
            Choose account
          </h2>
          <div className={s.setting}>
            {loggedAccounts.length > 0 ? (
              loggedAccounts.map((acc, index) => {
                function onClick() {
                  changeUser({ token: acc.token });
                }

                const isCurrent = acc.nickname === user.nickname;

                return (
                  <button
                    disabled={isCurrent}
                    key={index}
                    className={`button ${s.account} ${
                      isCurrent && s.account_type_current
                    }`}
                    onClick={onClick}
                  >
                    <img
                      src={acc.avatar}
                      className={s.account__img}
                      alt={`avatar of ${acc.nickname}`}
                    />
                    <h3 className='text text_color_second label-second'>
                      {acc.nickname}
                    </h3>
                  </button>
                );
              })
            ) : (
              <h4 className='text subhead text_color_second'>
                You must be logged in to at least one account before you can
                switch between accounts
              </h4>
            )}
          </div>
        </article>
      </article>
    </section>
  );
}
