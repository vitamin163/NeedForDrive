import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate, getTokens, translateOrderStatus, dhm } from '@/utils';
import { redX, greenV, verticalDots } from '@/icon';
import { Formik, Form, Field } from 'formik';
import emptyImage from '@/img/vwBeetle.jpg';
import { actions } from '@/store';
import cn from 'classnames';
import Popup from '../Popup';
import './Order.scss';

const Order = ({ proxy, api, order }) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.admin);
  const { popupIsOpen } = useSelector((state) => state.uiState);
  const { cars } = useSelector((state) => state.cars);
  const { cities } = useSelector((state) => state.cities);
  const { points } = useSelector((state) => state.points);
  const { rates } = useSelector((state) => state.rates);
  const { statuses } = useSelector((state) => state.orderStatus);
  const { requestState } = useSelector((state) => state.asyncRequestState);

  const currentOrder = orders[order];
  const { togglePopup, changeOrder, setRequestState, setError } = actions;
  const {
    id,
    carId,
    cityId,
    color,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
    pointId,
    price,
    dateFrom,
    dateTo,
    rateId,
    orderStatusId,
  } = currentOrder;

  const emptyData = 'Нет данных';
  const checkData = (data, type) => {
    switch (type) {
      case 'boolean':
        return typeof data !== 'boolean' ? false : data;
      case 'object':
        return (
          data || {
            name: emptyData,
            price: emptyData,
            address: emptyData,
            rateTypeId: { name: emptyData, unit: emptyData },
            id: '',
            thumbnail: false,
          }
        );
      default:
        return data || emptyData;
    }
  };

  const car = checkData(carId, 'object');
  const city = checkData(cityId, 'object');
  const point = checkData(pointId, 'object');
  const rate = checkData(rateId, 'object');
  const orderStatus = checkData(orderStatusId, 'object');
  const colorChecked = checkData(color);
  const dateFromChecked = checkData(dateFrom);
  const dateToChecked = checkData(dateTo);
  const isFullTankChecked = checkData(isFullTank, 'boolean');
  const isNeedChildChairChecked = checkData(isNeedChildChair, 'boolean');
  const isRightWheelChecked = checkData(isRightWheel, 'boolean');
  const priceChecked = checkData(price);

  const imgPath = car.thumbnail
    ? `http://api-factory.simbirsoft1.com${car.thumbnail.path}`
    : emptyImage;

  const changeOrderHandler = (orderId) => async (values) => {
    const { accessToken } = getTokens();
    const url = `${proxy}${api}db/order/${orderId}`;
    const updateOrder = {
      isFullTank: values.isFullTank,
      isNeedChildChair: values.isNeedChildChair,
      isRightWheel: values.isRightWheel,
      carId: values.carId,
      cityId: values.cityId,
      pointId: values.pointId,
      color: values.color,
      dateFrom: values.dateFrom,
      dateTo: values.dateTo,
      price: values.price,
      rateId: values.rateId,
      orderStatusId: values.orderStatusId,
    };

    dispatch(setRequestState('REQUEST'));
    try {
      const {
        data: { data },
      } = await axios({
        method: 'put',
        url,
        headers: {
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
          Authorization: `Bearer ${accessToken}`,
        },
        data: updateOrder,
      });
      dispatch(changeOrder(data));
      dispatch(setRequestState('SUCCESS'));
    } catch (e) {
      console.log(e);
      dispatch(setRequestState('FAILURE'));
      dispatch(setError(e.message));
    }
  };
  const getDefaultItem = (item) => {
    return item[0];
  };

  const orderButtonClass = cn({
    orderButton: true,
    orderButton_disabled: requestState === 'REQUEST',
  });

  return (
    <div className="orderList__order">
      <Formik
        initialValues={{
          isFullTank: isFullTankChecked,
          isNeedChildChair: isNeedChildChairChecked,
          isRightWheel: isRightWheelChecked,
          carId: car.id || getDefaultItem(cars).id,
          cityId: city.id || getDefaultItem(cities).id,
          pointId: point.id || getDefaultItem(points).id,
          color: colorChecked.toLowerCase(),
          dateFrom: dateFromChecked,
          dateTo: dateToChecked,
          price: priceChecked,
          rateId: rate.id || getDefaultItem(rates).id,
          orderStatusId: orderStatus.id || getDefaultItem(statuses).id,
        }}
        onSubmit={changeOrderHandler(id)}
      >
        {({ isSubmitting, resetForm }) => (
          <Form className="order-form">
            <img
              className="order-form__img"
              crossOrigin="anonymous"
              referrerPolicy="origin"
              src={imgPath}
              alt="car"
            />
            <div className="order-form__column">
              <div className="order-form__large-row">
                <span>{car.name}</span> в <span>{city.name}, </span> {point.address}
              </div>
              <div className="order-form__large-row">
                {formatDate(dateFromChecked)} — {formatDate(dateToChecked)}
              </div>
              <div className="order-form__large-row">
                Цвет: <span>{colorChecked}</span>
              </div>
            </div>
            <div role="group" aria-labelledby="checkbox-group" className="order-form__column">
              <label htmlFor="isFullTank">
                <Field
                  id="isFullTank"
                  type="checkbox"
                  name="isFullTank"
                  className="order-form__checkbox"
                />
                Полный бак
              </label>
              <label htmlFor="isNeedChildChair">
                <Field
                  id="isNeedChildChair"
                  type="checkbox"
                  name="isNeedChildChair"
                  className="order-form__checkbox"
                />
                Детское кресло
              </label>
              <label htmlFor="isRightWheel">
                <Field
                  type="checkbox"
                  id="isRightWheel"
                  name="isRightWheel"
                  className="order-form__checkbox"
                />
                Правый руль
              </label>
            </div>

            <div className="order-form__column">
              <div className="order-form__small-row">
                Статус: <span>{translateOrderStatus(orderStatus)}</span>
              </div>
              <div className="order-form__small-row">
                Тариф: <span>{`${rate.price} ₽/${rate.rateTypeId.unit}`}</span>
              </div>
              <div className="order-form__small-row">{dhm(dateFrom, dateTo)}</div>
            </div>

            <div className="order-form__price">{priceChecked} ₽</div>
            {popupIsOpen === id && <Popup returnHandler={() => dispatch(togglePopup(false))} />}
            <div className="order-form__button-container">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`order-form__orderButton ${orderButtonClass} orderButton__confirm`}
              >
                <img src={greenV} alt="" />
                Готово
              </button>
              <button
                disabled={isSubmitting}
                type="reset"
                onClick={() => {
                  resetForm();
                }}
                className={`${orderButtonClass} orderButton__reset`}
              >
                <img src={redX} alt="" />
                Отмена
              </button>
              <button
                disabled={isSubmitting}
                type="button"
                className={`${orderButtonClass} orderButton__change`}
                onClick={() => dispatch(togglePopup(id))}
              >
                <img src={verticalDots} alt="" />
                Изменить
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Order;
