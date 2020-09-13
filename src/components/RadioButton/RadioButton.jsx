import React from 'react';
import './RadioButton.scss';

const RadioButton = (props) => {
  const { name, checked, click } = props;
  return (
    <label htmlFor={name} className="radio">
      {name}
      <input id={name} type="radio" defaultChecked={checked} name="radio" onClick={click} />
      <span className="radio__checkmark"></span>
    </label>
  );
};
export default RadioButton;
