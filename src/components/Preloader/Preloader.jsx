// ? styles
import s from './Preloader.module.css';

// ? assets
import logoIcon from './../../assets/ReddNotes_logo_fire.svg';
import logoText from './../../assets/ReddNotes_logo_text.svg';

export default function Preloader() {
  return (
    <article className={s.main}>
      <div className={s.preloader}>
        <img src={logoIcon} alt='ReddNotes' className={s.logo__fire} />
      </div>

      <img src={logoText} alt='ReddNotes' className={s.logo__text} />
    </article>
  );
}
