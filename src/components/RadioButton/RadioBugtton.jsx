import React from 'react';
import './RadioButton.scss';

const RadioButton = (props) => {
  const { items: buttons } = props;
  const renderRadio = (items) => {
    return items.map((item, i) => {
      const { name, click, checked } = item;
      return (
        <label key={i} htmlFor={`${name}${i}`} className="radio">
          {name}
          <input
            id={`${name}${i}`}
            type="radio"
            defaultChecked={i === checked}
            name="radio"
            onClick={click}
          />
          <span className="radio__checkmark"></span>
        </label>
      );
    });
  };
  return renderRadio(buttons);
};
export default RadioButton;
