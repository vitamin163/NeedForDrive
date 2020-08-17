import React from 'react';
import './Spinner.scss';

const Spinner = () => {
  return (
    <div className="spinner-lds">
      <div className="spinner-lds__lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
