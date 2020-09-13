import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './TotalPage.scss';
import { format } from 'date-fns';
import { actions } from '@/store';
import Spinner from '@Components/Spinner';
import Error from '@Components/Error';
import { getNumber, getFuel } from '@/utils';
import Popup from '../Popup';
import Order from '../Order';

const TotalPage = (props) => {
  const { proxy, api, headers } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { popupIsOpen } = useSelector((state) => state.uiState);
  const { carId, isFullTank, dateFrom } = useSelector((state) => state.order);
  const { order } = useSelector((state) => state);

  const { requestState } = useSelector((state) => state.asyncRequestState);

  const date = format(new Date(dateFrom), 'dd.MM.yyyy HH:mm');
  const { togglePopup, setRequestState } = actions;
  const imgPath = `http://api-factory.simbirsoft1.com${carId.thumbnail.path}`;

  useEffect(() => {
    dispatch(setRequestState('SUCCESS'));
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
        url: `${proxy}${api}order`,
        headers: {
          ...headers,
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
        <Popup
          confirmHandler={() => sendOrder()}
          returnHandler={() => dispatch(togglePopup(false))}
          popupLabel="Подтвердить заказ"
          confirmLabel="Подтвердить"
          returnLabel="Вернуться"
        />
      )}
      <Order
        buttonName="Заказать"
        disabled={requestState === 'REQUEST'}
        click={() => dispatch(togglePopup(true))}
      />
    </>
  );
};

export default TotalPage;
