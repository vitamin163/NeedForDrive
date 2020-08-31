import React from 'react';
import './Error.scss';

const Error = (props) => {
  const { text } = props;
  return (
    <div className="custom-error">
      <div className="custom-error__text">{text}</div>
    </div>
  );
};

export default Error;
