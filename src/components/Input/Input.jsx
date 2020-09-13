import React, { forwardRef } from 'react';
import './Input.scss';
import cn from 'classnames';
import { cleanInput } from '@/icon';

// eslint-disable-next-line no-unused-vars
const Input = (props, ref) => {
  const {
    label,
    type,
    value,
    change,
    onClick,
    click,
    disable,
    dropdown,
    placeholder,
    keydown,
  } = props;

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
        onKeyDown={keydown}
        onClick={onClick}
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

export default forwardRef(Input);
