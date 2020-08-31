import React from 'react';
import { useSelector } from 'react-redux';
import { capitalize } from 'lodash';
import cn from 'classnames';
import './Order.scss';
import { dhm } from '../../../utils';

const Order = (props) => {
  const { buttonName, disabled, click } = props;
  const {
    pointId,
    cityId,
    carId,
    rateId,
    price,
    color,
    dateFrom,
    dateTo,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
  } = useSelector((state) => state.order);
  const { amount } = useSelector((state) => state.price);
  const { activeNav } = useSelector((state) => state.uiState);
  const buttonClass = cn({
    order__button: true,
    order__button_disabled: disabled,
  });

  const getCurrentPrice = () => {
    if (!carId.id) {
      return 0;
    }
    if (activeNav === 1) {
      return price;
    }
    return carId.priceMin > amount ? carId.priceMin : amount;
  };

  return (
    <div className="order-page__order order">
      <div className="order__content">
        <div className="order__title">Ваш заказ:</div>
        <ul className="order__list">
          {pointId.id && (
            <li className="order__item">
              Пункт выдачи
              <span className="order__name">
                {cityId.name}, {pointId.address}
              </span>
            </li>
          )}
          {carId.id && (
            <li className="order__item">
              Модель
              <span className="order__name">{carId.name}</span>
            </li>
          )}
          {color && (
            <li className="order__item">
              Цвет
              <span className="order__name">{capitalize(color)}</span>
            </li>
          )}
          {dateTo > 0 && (
            <li className="order__item">
              Длительность аренды
              <span className="order__name">{dhm(dateFrom, dateTo)}</span>
            </li>
          )}
          {rateId.id && (
            <li className="order__item">
              Тариф
              <span className="order__name">{rateId.rateTypeId.name}</span>
            </li>
          )}
          {isFullTank && (
            <li className="order__item">
              Полный бак
              <span className="order__name">Да</span>
            </li>
          )}
          {isNeedChildChair && (
            <li className="order__item">
              Детское кресло
              <span className="order__name">Да</span>
            </li>
          )}
          {isRightWheel && (
            <li className="order__item">
              Правый руль
              <span className="order__name">Да</span>
            </li>
          )}
        </ul>
        <div className="order__price">Цена: {getCurrentPrice()} ₽</div>
      </div>
      <button className={buttonClass} onClick={click}>
        {buttonName}
      </button>
    </div>
  );
};
export default Order;
