import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RadioButton from '../../RadioButton/RadioBugtton.jsx';
import { actions } from '../../../store';

const Rates = ({ rates }) => {
  const dispatch = useDispatch();
  const {
    rateId: { id: rateId },
  } = useSelector((state) => state.order);
  const { addRateId } = actions;
  const renderRates = (items) => {
    return items.map((rate, i) => {
      const {
        id,
        rateTypeId: { unit, name },
        price,
      } = rate;
      return (
        <RadioButton
          key={i}
          name={`${name}, ${price}₽/${unit}`}
          checked={id === rateId}
          click={() => {
            dispatch(addRateId(id));
          }}
        />
      );
    });
  };
  return (
    <>
      <div className="options-page__label">Тариф</div>
      <form className="options-page__rate">{renderRates(rates)}</form>
    </>
  );
};
export default Rates;
