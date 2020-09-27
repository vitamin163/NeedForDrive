import React from 'react';
import './FilterButton.scss';
import { Field } from 'formik';

const FilterButton = (props) => {
  const { name, as, render, children, type, placeholder } = props;
  if (as === 'input') {
    return (
      <Field type={type} name={name} as={as} className="filterButton" placeholder={placeholder} />
    );
  }
  return (
    <Field name={name} as={as} className="filterButton">
      {children}
      {render()}
    </Field>
  );
};

export default FilterButton;
