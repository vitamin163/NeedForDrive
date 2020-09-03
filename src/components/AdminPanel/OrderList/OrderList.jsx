import React from 'react';
import './OrderList.scss';
import FilterButton from '../FilterButton/FilterButton.jsx';

const OrderList = () => {
  return (
    <div className="orderList">
      <div className="orderList__sub-header">Заказы</div>
      <div className="orderList__container">
        <div className="orderList__topbar">
          <div className="orderList__button-container">
            <FilterButton name="За неделю" />
            <FilterButton name="i30 N" />
            <FilterButton name="Ульяновск" />
            <FilterButton name="В процессе" />
          </div>
          <button className="orderList__applyButton">Применить</button>
        </div>
        <div className="orderList__content">2</div>
        <div className="orderList__footer">3</div>
      </div>
    </div>
  );
};
export default OrderList;
