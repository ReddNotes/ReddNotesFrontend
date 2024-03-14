// ! modules
import { useEffect, useState } from 'react';

// ? style
import s from './Settings.module.css';

// ? utils
import { LOCAL_STORAGE_VARIABLES } from './../../utils/constants';

export default function Settings({
  setDarkModeEnabled,
  isDarkModeEnabled,
  isAuthorized,
  handleLogin,
  user,
}) {
  const [loggedAccounts, setLoggedAccounts] = useState([]);

  // ? useEffects
  useEffect(() => {
    const length = localStorage.length;
    const _nicknames = [];

    for (let i = 0; i < length; i++) {
      const element = localStorage.key(i);

      if (!LOCAL_STORAGE_VARIABLES.includes(element)) _nicknames.push(element);
    }

    const _loggedAccounts = [];

    _nicknames.forEach((_nickname) => {
      const _user = JSON.parse(localStorage.getItem(_nickname));
      _user.nickname = _nickname;
      _loggedAccounts.push(_user);
    });

    setLoggedAccounts(_loggedAccounts);
  }, []);

  // ? functions

  // change to dark or light theme
  function changeColorMode() {
    const newMode = !isDarkModeEnabled;
    localStorage.setItem('isDarkModeEnabled', newMode);

    const _root = document.getElementById('root');
    const _html = document.querySelector('html');

    if (newMode) {
      _root.setAttribute('data-theme', 'dark');
      _html.setAttribute('data-theme', 'dark');
    } else {
      _root.setAttribute('data-theme', 'light');
      _html.setAttribute('data-theme', 'light');
    }

    if (isAuthorized) {
      const _data = JSON.parse(localStorage.getItem(user.nickname));
      _data.isDarkModeEnabled = newMode;
      localStorage.setItem(user.nickname, JSON.stringify(_data));
    }

    setDarkModeEnabled(newMode);
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

        {/* theme switcher */}
        <article className={s.topic}>
          <div className={s.setting}>
            <h3 className='text label-first'>Dark mode</h3>

            <input
              type='checkbox'
              checked={isDarkModeEnabled}
              className={`button ${s.switch}`}
              onChange={changeColorMode}
            />
          </div>
        </article>

        {/* Choose account */}
        <article className={s.topic}>
          <h2 className={`text label-first ${s.topic__title}`}>
            Choose account
          </h2>
          <div className={s.setting}>
            {loggedAccounts.lastIndexOf > 0 ? (
              loggedAccounts.map((acc, index) => {
                function onClick() {
                  changeUser({ token: acc.token });
                }

                return (
                  <button
                    key={index}
                    className={`button ${s.account} ${
                      acc.nickname === user.nickname && s.account_type_current
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
