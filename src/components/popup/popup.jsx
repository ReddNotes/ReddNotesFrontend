// ! modules
import { useState } from 'react';

/* needed for dynamic functionality
import (the exported context variable)
import { useContext } from 'react';
*/

// ? styles
import s from './popup.module.css';

// ? assets
import closeIcon from '../../assets/icon/close.svg';

const Popup = ({ src, alt }) => {
  const [popup, setPopup] = useState(false);
  /*
  const newVariable = useContext(exportedCreateContextVariable)
  const [popup, setPopup] = useState(newVariable);
*/
  //the onClick should be done in the page where <popup/> is done so comment out here
  const onClick = () => {
    setPopup(!popup);
  };
  return (
    //change the onClicks to props.yourOnClick function for button in
    //popupWrapper and remove the outside button
    <>
      <button onClick={onClick}>X</button>
      {popup && (
        <article className={s.main}>
          <div className={s.container}>
            <button onClick={onClick} className={`button ${s.close}`}>
              <img
                className={s.close_icon}
                src={closeIcon}
                alt='sign to close popup'
              />
            </button>

            <img
              className={s.img}
              src={src}
              alt={alt || 'picure, that you have just opened'}
            />
          </div>
        </article>
      )}
    </>
  );
};

export default Popup;
