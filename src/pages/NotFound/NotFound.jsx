// ! modules
import { NavLink } from 'react-router-dom';

// ? assets
import fullLogo from './../../assets/ReddNotes_logo_full.svg';
import fireLogo from './../../assets/ReddNotes_logo_fire.svg';

// ? style
import s from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={s.main}>
      <div className={s.container}>
        <img src={fullLogo} alt='ReddNotes Logo' className={s.logo} />
        <div className={s.center_content}>
          <div className={s.center_content_404}>
            <p>4</p>
            <img src={fireLogo} alt='0' />
            <p>4</p>
          </div>
          <span className='text text_color_accent title-third'>
            Page not found
          </span>
        </div>
        <NavLink className='text link link_underline' to={'/'}>
          Go back to notes
        </NavLink>
      </div>
    </div>
  );
}
