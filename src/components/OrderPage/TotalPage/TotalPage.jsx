import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './TotalPage.scss';
import Order from '../Order/Order.jsx';
import { actions } from '../../../store';

const TotalPage = () => {
  const dispatch = useDispatch();
  const { popupIsOpen } = useSelector((state) => state.uiState);
  console.log(popupIsOpen);
  const { togglePopup } = actions;
  const imgPath =
    'http://api-factory.simbirsoft1.com/files/5f21d9059d3a610b850fcd56_5ecaa87d099b810b946ca32e_32a0ec8797f5ee5b08c70fdabb7b06bd.png';
  return (
    <>
      <div className="order-page__total-page total-page">
        <div className="total-page__content">
          <div className="total-page__info">
            <div className="total-page__model">Hyndai, i30 N</div>
            <div className="total-page__fuel">
              Топливо <span>100%</span>
            </div>
            <div className="total-page__date">
              Доступна с <span>12.06.2019 12:00</span>
            </div>
          </div>

          <img
            className="total-page__img"
            crossOrigin="anonymous"
            referrerPolicy="origin"
            src={imgPath}
            alt="car"
          />
        </div>
      </div>
      {popupIsOpen && (
        <div className="total-page__popup">
          <div className="total-page__popup-label">Подтвердить заказ</div>
          <div className="total-page__button-container">
            <button className="total-page__confirm-button">Подтвердить</button>
            <button
              className="total-page__return-button"
              onClick={() => dispatch(togglePopup(false))}
            >
              Вернуться
            </button>
          </div>
        </div>
      )}
      <Order buttonName="Заказать" disabled={false} click={() => dispatch(togglePopup(true))} />
    </>
  );
};

export default TotalPage;
