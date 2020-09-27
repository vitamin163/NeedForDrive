import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { actions } from '@/store';
import './FinalPage.scss';
import Spinner from '@Components/Spinner';
import Error from '@Components/Error';
import { getNumber, getFuel } from '@/utils';
import getData from '@/store/fetchData';
import Popup from '../Popup';
import Order from '../Order';

const FinalPage = (props) => {
  const { proxy, api, headers } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { orderId: id } = useParams();
  const orderId = id || localStorage.getItem('orderId');
  const { popupIsOpen } = useSelector((state) => state.uiState);
  const { carId, isFullTank, dateFrom } = useSelector((state) => state.order);
  const { requestState } = useSelector((state) => state.asyncRequestState);
  const { statuses } = useSelector((state) => state.orderStatus);
  const cancelledOrderStatus = statuses.find((status) => status.name === 'cancelled');

  const {
    togglePopup,
    setRequestState,
    setOrder,
    setDefaultOrder,
    changeActiveNav,
    deleteCityId,
    addOrderStatus,
  } = actions;
  const fetchData = [
    {
      url: `${proxy}${api}order/${orderId}`,
      action: setOrder,
    },
    {
      url: `${proxy}${api}orderStatus/`,
      action: addOrderStatus,
    },
  ];
  useEffect(() => {
    dispatch(getData(fetchData, headers));
    return () => {
      dispatch(setRequestState(null));
      dispatch(togglePopup(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const date = format(new Date(dateFrom), 'dd.MM.yyyy HH:mm');

  const undoOrder = async () => {
    dispatch(setRequestState('REQUEST'));
    try {
      await axios({
        method: 'put',
        url: `${proxy}${api}order/${orderId}`,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          orderStatusId: {
            name: 'cancelled',
            id: cancelledOrderStatus.id,
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
              src={`http://api-factory.simbirsoft1.com${carId.thumbnail.path}`}
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
      {requestState === 'SUCCESS' && (
        <Order buttonName="Отменить" disabled={false} click={() => dispatch(togglePopup(true))} />
      )}
    </>
  );
};
export default FinalPage;
