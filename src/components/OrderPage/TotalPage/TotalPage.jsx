import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import cn from 'classnames';
import './TotalPage.scss';
import { format } from 'date-fns';
import Order from '../Order/Order.jsx';
import { actions } from '../../../store';
import Spinner from '../../Spinner/Spinner.jsx';
import Error from '../../Error/Error.jsx';
import { getNumber, getFuel } from '../../../utils';

const TotalPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { popupIsOpen } = useSelector((state) => state.uiState);
  const { carId, isFullTank, dateFrom } = useSelector((state) => state.order);
  const { order } = useSelector((state) => state);

  const { requestState } = useSelector((state) => state.asyncRequestState);
  const { isOrderStatusLoaded } = useSelector((state) => state.orderStatus);

  const date = format(new Date(dateFrom), 'dd.MM.yyyy HH:mm');
  const { togglePopup, setRequestState, addOrderStatus } = actions;
  const imgPath = `http://api-factory.simbirsoft1.com${carId.thumbnail.path}`;

  useEffect(() => {
    if (isOrderStatusLoaded) {
      dispatch(setRequestState('SUCCESS'));
    }
    const getData = async () => {
      dispatch(setRequestState('REQUEST'));
      try {
        const {
          data: { data: dataOrderStatus },
        } = await axios.get(
          'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/orderStatus/',
          {
            headers: {
              'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
              Authorization: 'Bearer 4cbcea96de',
            },
          },
        );
        dispatch(addOrderStatus(dataOrderStatus));
        dispatch(setRequestState('SUCCESS'));
      } catch (error) {
        console.log(error);
        dispatch(setRequestState('FAILURE'));
      }
    };
    if (!isOrderStatusLoaded) {
      getData();
    }
    return () => {
      dispatch(setRequestState(null));
      dispatch(togglePopup(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendOrder = async () => {
    dispatch(setRequestState('REQUEST'));
    try {
      const {
        data: { data },
      } = await axios({
        method: 'post',
        url: 'http://api-factory.simbirsoft1.com/api/db/order',
        baseURL: 'https://cors-anywhere.herokuapp.com/',
        headers: {
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(order),
      });
      dispatch(setRequestState('SUCCESS'));
      localStorage.setItem('orderId', data.id);
      history.push(`/order-page/order/${data.id}`);
    } catch (error) {
      console.log(error);
      dispatch(setRequestState('FAILURE'));
    }
  };
  const confirmButtonClass = cn({
    'popup__confirm-button': true,
    'popup__confirm-button_loading': requestState === 'REQUEST',
  });
  return (
    <>
      {requestState === 'REQUEST' && <Spinner />}
      {requestState === 'SUCCESS' && (
        <div className="order-page__total-page total-page">
          <div className="total-page__content">
            <div className="total-page__info">
              <div className="total-page__model">{carId.name}</div>
              <div className="total-page__number">{getNumber(carId.number)}</div>
              <div className="total-page__fuel">
                Топливо <span>{getFuel(isFullTank, carId.tank)}</span>
              </div>
              <div className="total-page__date">
                Доступна с <span>{date}</span>
              </div>
            </div>
            <img
              className="total-page__img"
              crossOrigin="anonymous"
              referrerPolicy="origin"
              src={imgPath}
              alt="car"
            />
          </div>
        </div>
      )}
      {requestState === 'FAILURE' && <Error text="Не удалось получить данные" />}
      {popupIsOpen && (
        <div className="total-page__popup popup">
          <div className="popup__label">Подтвердить заказ</div>
          <div className="popup__button-container">
            <button className={confirmButtonClass} onClick={() => sendOrder()}>
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              Подтвердить
            </button>
            <button className="popup__return-button" onClick={() => dispatch(togglePopup(false))}>
              Вернуться
            </button>
          </div>
        </div>
      )}
      <Order buttonName="Заказать" disabled={false} click={() => dispatch(togglePopup(true))} />
    </>
  );
};

export default TotalPage;
