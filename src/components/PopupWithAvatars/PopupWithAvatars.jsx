// ! modules
import { useState } from 'react';

// ? styles
import s from './PopupWithAvatars.module.css';

// ? assets
import closeIcon from './../../assets/icon/close.svg';

// ? utils
import { AVATARS } from './../../utils/constants';

export default function PopupWithAvatars({ handleChooseAvatar, handlerClose }) {
  return (
    <section className={s.main}>
      <article className={s.container}>
        <button onClick={handlerClose} className={`button ${s.close}`}>
          <img
            className={s.close_icon}
            src={closeIcon}
            alt='sign to close popup'
          />
        </button>
        <div className={s.avatars}>
          {AVATARS.ALL.map((avatar, index) => {
            return (
              <article key={index} className={s.avatar}>
                <button
                  className='button'
                  onClick={() => {
                    handleChooseAvatar({
                      src: avatar,
                    });
                    handlerClose();
                  }}
                >
                  <img className={s.avatar__img} src={avatar} />
                </button>
              </article>
            );
          })}
        </div>
      </article>
    </section>
  );
}
