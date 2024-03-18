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
    time: 16,
  },
  handleCloseNotification = () => {},
}) {
  // constants
  const lineId = `notification-${data.id}-line`;
  // ? useStates

  // time before notification will close
  const [timeToClose, setTimeToClose] = useState(data.time);

  // ? useEffects

  // timer to close
  useEffect(() => {
    setTimeout(() => {
      clearInterval(interval);
      handleCloseNotification({ id: data.id });
    }, data.time * 1_000);

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

    _header.style.width = `${(100 * timeToClose) / data.time}%`;
  }, [data.time, timeToClose]);

  // ? functions

  // close notification
  function closeNotification() {
    handleCloseNotification({ id: data.id });
  }

  return (
    <article className={`${s.main} ${data.isError && s.main_type_error}`}>
      {/* top */}
      <header className={s.header}>
        <div>
          <span className='text text_color_second detail'>#{data.id}</span>
          <h4 className='text subhead'>{data.title}</h4>
        </div>
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
