/* needed for dynamic functionality
import (the exported context variable)
import { useContext } from 'react';
*/

// ? styles
import s from './PopupPicture.module.css';

// ? assets
import closeIcon from './../../assets/icon/close.svg';

export default function PopupPicture({ src, alt, handlerClose }) {
  /*
  const newVariable = useContext(exportedCreateContextVariable)
  const [popup, setPopup] = useState(newVariable);
*/
  //the onClick should be done in the page where <popup/> is done so comment out here

  return (
    //change the onClicks to props.yourOnClick function for button in
    //popupWrapper and remove the outside button

    <article className={s.main}>
      <div className={s.container}>
        <button onClick={handlerClose} className={`button ${s.close}`}>
          <img
            className={s.close_icon}
            src={closeIcon}
            alt='sign to close popup'
          />
        </button>

        <img
          className={s.img}
          src={src}
          alt={alt || 'picture, that you have just opened'}
        />
      </div>
    </article>
  );
}
