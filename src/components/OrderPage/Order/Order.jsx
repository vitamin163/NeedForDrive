import React from 'react';
import './Order.scss';

const Order = (props) => {
  const { buttonName, buttonClass } = props;
  return (
    <div className="order-page__order order">
      <div className="order__content">
        <div className="order__title">Ваш заказ:</div>
        <ul className="order__list">
          <li className="order__item">
            Пункт выдачи
            <span className="order__address">Ульяновск, Нариманова 42</span>
          </li>
        </ul>
        <div className="order__price">Цена: от 8 000 до 12 000 ₽</div>
      </div>
      <button className={buttonClass}>{buttonName}</button>
    </div>
  );
};
export default Order;
