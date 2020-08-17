import React from 'react';
import { useSelector } from 'react-redux';
import { capitalize } from 'lodash';
import cn from 'classnames';
import './Order.scss';
import { dhm } from '../../../utils';

const Order = (props) => {
  const { buttonName, disabled, click } = props;
  const {
    pointId: { id: pointId },
    cityId: { id: cityId },
    carId: { id: carId },
    rateId: { id: rateId },
    price,
    color,
    dateFrom,
    dateTo,
  } = useSelector((state) => state.order);
  const { byId: cities } = useSelector((state) => state.cities);
  const { byId: points } = useSelector((state) => state.points);
  const { byId: cars } = useSelector((state) => state.cars);
  const { byId: rates } = useSelector((state) => state.rates);
  const { amount } = useSelector((state) => state.price);
  const { activeNav } = useSelector((state) => state.uiState);
  const rate = rates[rateId];
  const buttonClass = cn({
    order__button: true,
    order__button_disabled: disabled,
  });
  const car = cars[carId];
  const getCurrentPrice = () => {
    if (!car) {
      return 0;
    }
    if (activeNav === 1) {
      return price;
    }
    return car.priceMin > amount ? car.priceMin : amount;
  };

  return (
    <div className="order-page__order order">
      <div className="order__content">
        <div className="order__title">Ваш заказ:</div>
        <ul className="order__list">
          {pointId && (
            <li className="order__item">
              Пункт выдачи
              <span className="order__name">
                {cities[cityId].name}, {points[pointId].address}
              </span>
            </li>
          )}
          {carId && (
            <li className="order__item">
              Модель
              <span className="order__name">{car.name}</span>
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
          {rateId && (
            <li className="order__item">
              Тариф
              <span className="order__name">{rate.rateTypeId.name}</span>
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
