// Notification.js

// ! modules
import { useEffect, useState } from 'react';

// ? styles
import s from './Notification.module.css';

// ? assets
import closeIcon from './../../assets/icon/close.svg';

export default function Notification({
  data = {
    id: 0,
    title: 'Example',
    text: 'Someone create a new one note',
    isError: false,
  },
  handleCloseNotification = () => {},
}) {
  // constants
  const lineId = `notification-${data.id}-line`;
  const timeAlive = 16;
  // ? useStates

  // time before notification will close
  const [timeToClose, setTimeToClose] = useState(timeAlive);

  // ? useEffects

  // timer to close
  useEffect(() => {
    setTimeout(() => {
      clearInterval(interval);
      handleCloseNotification({ id: data.id });
    }, timeAlive * 1_000);

    const interval = setInterval(() => {
      setTimeToClose((pre) => {
        return pre - 1 / 100;
      });
    }, 1_0);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const _header = document.getElementById(lineId);

    if (!_header) return;

    _header.style.width = `${(100 * timeToClose) / timeAlive}%`;
  }, [timeToClose]);

  // ? functions

  // close notification
  function closeNotification() {
    handleCloseNotification({ id: data.id });
  }

  return (
    <article className={`${s.main} ${data.isError && s.main_type_error}`}>
      {/* top */}
      <header className={s.header}>
        <h4 className='text subhead'>{data.title}</h4>
        <button className='button' onClick={closeNotification}>
          <img className={s.icon} src={closeIcon} alt='close icon' />
        </button>
      </header>
      {/* line */}
      <div id={lineId} className={s.line}></div>
      {/* main */}
      <div className={s.content}>
        <p className='text detail'>{data.text}</p>
      </div>
    </article>
  );
}
