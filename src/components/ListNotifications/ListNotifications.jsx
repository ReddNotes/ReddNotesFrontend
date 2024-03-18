// ListNotifications.js

// ? styles
import s from './ListNotifications.module.css';

// ? components
import Notification from '../Notification/Notification';

export default function ListNotifications({
  setNotifications,
  notifications,
  isAuthorized,
}) {
  function closeNotification({ id }) {
    setNotifications((pre) => pre.filter((not) => not.id !== id));
  }

  return (
    <article className={`${s.main} ${!isAuthorized && s.main_type_bottom}`}>
      {notifications.map((data, index) => {
        return (
          <Notification
            key={data.id}
            data={data}
            handleCloseNotification={closeNotification}
          />
        );
      })}
    </article>
  );
}
