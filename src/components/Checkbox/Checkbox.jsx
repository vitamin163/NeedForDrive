import React from 'react';
import './Checkbox.scss';

const Checkbox = (props) => {
  const { items: buttons } = props;
  const renderCheckbox = (items) => {
    return items.map((item, i) => {
      const { name, click, checked } = item;
      return (
        <label key={i} htmlFor={`${name}${i}`} className="checkbox">
          {name}
          <input
            id={`${name}${i}`}
            type="checkbox"
            defaultChecked={i === checked}
            name="checkbox"
            onClick={click}
          />
          <span className="checkbox__checkmark"></span>
        </label>
      );
    });
  };
  return renderCheckbox(buttons);
};
export default Checkbox;
