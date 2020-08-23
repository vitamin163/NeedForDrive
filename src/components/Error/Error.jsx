import React from 'react';
import './Error.scss';

const Error = (props) => {
  const { text } = props;
  return <div className="custom-error">{text}</div>;
};

export default Error;
