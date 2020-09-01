import React from 'react';
import { useSelector } from 'react-redux';
import './Popup.scss';
import cn from 'classnames';

const Popup = (props) => {
  const { confirmHandler, returnHandler, popupLabel, confirmLabel, returnLabel } = props;
  const { requestState } = useSelector((state) => state.asyncRequestState);
  const confirmButtonClass = cn({
    'popup__confirm-button': true,
    'popup__confirm-button_loading': requestState === 'REQUEST',
  });

  const returnButtonClass = cn({
    'popup__return-button': true,
    'popup__return-button_disabled': requestState === 'REQUEST',
  });

  return (
    <div className="total-page__popup popup">
      <div className="popup__label">{popupLabel}</div>
      <div className="popup__button-container">
        <button className={confirmButtonClass} onClick={confirmHandler}>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          {confirmLabel}
        </button>
        <button className={returnButtonClass} onClick={returnHandler}>
          {returnLabel}
        </button>
      </div>
    </div>
  );
};

export default Popup;
