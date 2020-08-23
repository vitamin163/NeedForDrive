import React from 'react';
import { useDispatch } from 'react-redux';
import RadioButton from '../../RadioButton/RadioBugtton.jsx';
import { actions } from '../../../store';

const Colors = ({ colors }) => {
  const dispatch = useDispatch();
  const { addColor } = actions;
  const renderColors = (items) => {
    return items.map((color, i) => {
      return (
        <RadioButton
          key={color}
          name={color}
          checked={i === 0}
          click={() => dispatch(addColor(color))}
        />
      );
    });
  };
  return (
    <>
      <div className="options-page__label">Цвет</div>
      <form className="options-page__colors-container">{renderColors(colors)}</form>
    </>
  );
};

export default Colors;
