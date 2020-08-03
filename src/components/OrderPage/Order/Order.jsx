import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { actions } from '../../../store';
import './Order.scss';

const Order = (props) => {
  const dispatch = useDispatch();
  const { changeActive } = actions;
  const { buttonName, disabled, activeLink } = props;
  const {
    pointId: { id: pointId },
    cityId: { id: cityId },
    carId: { id: carId },
    price,
  } = useSelector((state) => state.order);

  const { byId: cities } = useSelector((state) => state.cities);
  const { byId: points } = useSelector((state) => state.points);
  const { byId: cars } = useSelector((state) => state.cars);
  const buttonClass = cn({
    order__button: true,
    order__button_disabled: disabled,
  });
  return (
    <div className="order-page__order order">
      <div className="order__content">
        <div className="order__title">Ваш заказ:</div>
        <ul className="order__list">
          {pointId && (
            <li className="order__item">
              Пункт выдачи
              <span className="order__address">
                {cities[cityId].name}, {points[pointId].address}
              </span>
            </li>
          )}
          {carId && (
            <li className="order__item">
              Модель
              <span className="order__address">{cars[carId].name}</span>
            </li>
          )}
        </ul>
        <div className="order__price">Цена: {price} ₽</div>
      </div>
      <button className={buttonClass} onClick={() => dispatch(changeActive(activeLink))}>
        {buttonName}
      </button>
    </div>
  );
};
export default Order;
