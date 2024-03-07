// ? styles
import s from './MainContainer.module.css';

// ? components
import NotificationAuth from './../../components/NotificationAuth/NotificationAuth';

export default function MainContainer({ isAuthorized, children }) {
  return (
    <section className={s.main}>
      {!isAuthorized && <NotificationAuth />}
      {children}
    </section>
  );
}
