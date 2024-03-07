// ? styles
import { NavLink } from 'react-router-dom';
import s from './NotificationAuth.module.css';

export default function NotificationAuth() {
  return (
    <article className={s.main}>
      <div className={s.container}>
        {/* // todo think about title */}
        <h3 className={s.title}>Please login</h3>
        <p className={s.message}>
          You can not use all functionality of this application. To use full
          functionality as set reaction, add to favorites, write comments,
          create own notes - you have to be logged.{' '}
          <NavLink className={'link'} to={'/login'}>
            Login here
          </NavLink>
        </p>
      </div>
    </article>
  );
}
