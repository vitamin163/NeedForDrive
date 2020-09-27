import React from 'react';
import './AdminButton.scss';

const AdminButton = ({ name, color, disabled, type, action }) => {
  return (
    <button
      className={`adminButton adminButton_${color}`}
      disabled={disabled}
      type={type}
      onClick={action}
    >
      {name}
    </button>
  );
};

export default AdminButton;
