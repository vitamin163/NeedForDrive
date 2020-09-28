import React, { useEffect } from 'react';
import './ErrorPage.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '@/store';
import AdminButton from '../Common/AdminButton';

const ErrorPage = ({ errorCode }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setRequestState } = actions;
  const backward = () => {
    history.push('/admin');
  };
  useEffect(() => {
    return () => {
      dispatch(setRequestState(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="error-page">
      <h1 className="error-page__code">{errorCode || '404'}</h1>
      <h2 className="error-page__description">Что-то пошло не так</h2>
      <h3 className="error-page__small-text">
        {errorCode ? 'Перезагрузите страницу' : 'Страница не найдена'}
      </h3>
      <AdminButton action={backward} color="blue" name="Назад" />
    </div>
  );
};

export default ErrorPage;
