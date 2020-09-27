import React, { useEffect, useRef } from 'react';
import './Filter.scss';
import { Formik, Form, useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import AdminButton from '../AdminButton';

const GetPage = () => {
  const { currentOrdersPage, currentCarsPage } = useSelector((state) => state.admin);
  const { submitForm } = useFormikContext();
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      submitForm();
    } else {
      didMountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrdersPage, currentCarsPage]);
  return null;
};

const Filter = (props) => {
  const { initialValues, onSubmit, children } = props;
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className="filter-form">
          <div className="filter-form__button-container">{children}</div>
          <AdminButton name="Применить" color="blue" type="submit" disabled={isSubmitting} />
          <GetPage />
        </Form>
      )}
    </Formik>
  );
};

export default Filter;
