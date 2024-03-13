// ! modules

// ? style
import s from './Settings.module.css';

export default function Settings({ isDarkModeEnabled, setDarkModeEnabled }) {
  return (
    <section className={s.global}>
      <article className={s.main}>
        <header className={s.header}>
          <h1 className='text title-second'>Settings</h1>
        </header>

        <div className={s.entry}>
          <p className='text label-first'>Dark mode</p>
          <div className='toggleWrapper'>
            <input
              type='checkbox'
              checked={isDarkModeEnabled}
              className={`button ${s.switch}`}
              onChange={() => setDarkModeEnabled(!isDarkModeEnabled)}
            />
          </div>
        </div>
      </article>
    </section>
  );
}
