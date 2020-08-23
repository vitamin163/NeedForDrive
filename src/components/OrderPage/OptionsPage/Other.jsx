import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../../store';
import Checkbox from '../../Checkbox/Checkbox.jsx';

const Other = () => {
  const dispatch = useDispatch();
  const { addOtherPrice, setOptions } = actions;
  const otherPriceHandler = (price, option) => ({ target: { checked } }) => {
    if (checked) {
      dispatch(addOtherPrice(price));
      dispatch(setOptions({ option, value: true }));
    } else {
      dispatch(addOtherPrice(-price));
      dispatch(setOptions({ option, value: false }));
    }
  };
  const renderOther = () => {
    const items = [
      { name: 'Полный бак, 500р', price: 500, option: 'isFullTank' },
      { name: 'Детское кресло, 200р', price: 200, option: 'isNeedChildChair' },
      { name: 'Правый руль, 1600р', price: 1600, option: 'isRightWheel' },
    ];
    return items.map((item) => {
      const { name, price, option } = item;
      return <Checkbox key={option} name={name} change={otherPriceHandler(price, option)} />;
    });
  };
  return (
    <>
      <div className="options-page__label">Доп услуги</div>
      <form className="options-page__other">{renderOther()}</form>
    </>
  );
};
export default Other;
