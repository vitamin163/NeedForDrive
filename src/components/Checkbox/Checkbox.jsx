import React from 'react';
import './Checkbox.scss';

const Checkbox = (props) => {
  const { name, checked, change } = props;
  return (
    <label htmlFor={name} className="checkbox">
      {name}
      <input
        id={name}
        type="checkbox"
        defaultChecked={checked}
        name="checkbox"
        onChange={(event) => change(event)}
      />
      <span className="checkbox__checkmark"></span>
    </label>
  );
};
export default Checkbox;
