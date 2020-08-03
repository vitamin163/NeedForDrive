import React from 'react';
import './Input.scss';
import cn from 'classnames';
import icons from '../../icon';

const Input = (props) => {
  const { label, type, value, change, click, disable, dropdown, placeholder } = props;
  const { cleanInput } = icons;

  const inputClass = cn({
    'input-container__input': true,
    'input-container__input_disable': disable,
  });

  return (
    <div className="input-container">
      <span className="input-container__label">{label}</span>
      <input
        type={type}
        value={value}
        onChange={change}
        className={inputClass}
        placeholder={placeholder}
      />
      {value && (
        <button className="input-container__clean-input" onClick={click}>
          <img src={cleanInput} alt="clean input" />
        </button>
      )}
      {!value && <div className="input-container__fake"></div>}
      {dropdown}
    </div>
  );
};

export default Input;
