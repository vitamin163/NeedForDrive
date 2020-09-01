import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import Order from '../Order/Order.jsx';
import './FinalPage.scss';
import { actions } from '../../../store';
import Spinner from '../../Spinner/Spinner.jsx';
import Error from '../../Error/Error.jsx';
import Popup from '../Popup/Popup.jsx';
import { getNumber, getFuel } from '../../../utils';

const FinalPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const order = localStorage.getItem('order');
  const orderId = localStorage.getItem('orderId');
  const { popupIsOpen } = useSelector((state) => state.uiState);
  const { carId, isFullTank, dateFrom } = useSelector((state) => state.order);
  const { requestState } = useSelector((state) => state.asyncRequestState);
  const {
    togglePopup,
    setRequestState,
    setOrder,
    setDefaultOrder,
    changeActiveNav,
    deleteCityId,
  } = actions;

  useEffect(() => {
    if (order) {
      dispatch(setRequestState('SUCCESS'));
    }
    const getData = async () => {
      dispatch(setRequestState('REQUEST'));
      try {
        const {
          data: { data: dataOrder },
        } = await axios.get(
          `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/order/${orderId}`,
          {
            headers: {
              'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
              Authorization: 'Bearer 4cbcea96de',
            },
          },
        );
        localStorage.setItem('order', JSON.stringify(dataOrder));
        dispatch(setOrder(dataOrder));
        dispatch(setRequestState('SUCCESS'));
      } catch (error) {
        console.log(error);
        dispatch(setRequestState('FAILURE'));
      }
    };

    if (!order) {
      getData();
    }
    return () => {
      dispatch(setRequestState(null));
      dispatch(togglePopup(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const date = format(new Date(dateFrom), 'dd.MM.yyyy HH:mm');
  const imgPath = `http://api-factory.simbirsoft1.com${carId.thumbnail.path}`;

  const undoOrder = async () => {
    dispatch(setRequestState('REQUEST'));
    try {
      await axios({
        method: 'put',
        url: `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/order/${orderId}`,
        headers: {
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          orderStatusId: {
            name: 'cancelled',
            id: '5e26a1f5099b810b946c5d8c',
          },
        }),
      });
      dispatch(setRequestState('SUCCESS'));
      history.push(`/`);
      localStorage.removeItem('orderId');
      localStorage.removeItem('order');
      dispatch(setDefaultOrder());
      dispatch(changeActiveNav(0));
      dispatch(deleteCityId());
    } catch (error) {
      console.log(error);
      dispatch(setRequestState('FAILURE'));
    }
  };
  return (
    <>
      {requestState === 'REQUEST' && <Spinner />}
      {requestState === 'SUCCESS' && (
        <div className="order-page__final-page final-page">
          <div className="final-page__content">
            <div className="final-page__info">
              <div className="final-page__status">Ваш заказ подтвержден</div>
              <div className="final-page__model">{carId.name}</div>
              <div className="final-page__number">{getNumber(carId.number)}</div>
              <div className="final-page__fuel">
                Топливо <span>{getFuel(isFullTank, carId.tank)}</span>
              </div>
              <div className="final-page__date">
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
          confirmHandler={() => undoOrder()}
          returnHandler={() => dispatch(togglePopup(false))}
          popupLabel="Отменить заказ?"
          confirmLabel="Отменить"
          returnLabel="Вернуться"
        />
      )}
      <Order buttonName="Отменить" disabled={false} click={() => dispatch(togglePopup(true))} />
    </>
  );
};
export default FinalPage;
