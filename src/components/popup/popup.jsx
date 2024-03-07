import React from 'react';
import './popup.css';
import { useState } from 'react';

/* needed for dynamic functionality
import (the exported context variable)
import { useContext } from 'react';
*/

const Popup = (props) => {
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
        <div className='popupWrapper'>
          <div className='popupButtonWrapper'>
            <button onClick={onClick} className='closePopUp'>
              X
            </button>
          </div>
          <div className='popupImgContainer'>
            <img className='popupImg' src={props.imgSrc} />
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
