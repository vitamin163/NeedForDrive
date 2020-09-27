import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Field, useFormikContext } from 'formik';
import './Popup.scss';
import cn from 'classnames';
import DatePicker from 'react-datepicker';

const Popup = ({ returnHandler }) => {
  const { requestState } = useSelector((state) => state.asyncRequestState);
  const { cars } = useSelector((state) => state.cars);
  const { cities } = useSelector((state) => state.cities);
  const { points } = useSelector((state) => state.points);
  const { rates } = useSelector((state) => state.rates);
  const { statuses } = useSelector((state) => state.orderStatus);

  const returnButtonClass = cn({
    'order-popup__return-button': true,
    'order-popup__return-button_disabled': requestState === 'REQUEST',
  });

  const renderSelect = (items, mark) => {
    if (mark === 'colors') {
      return items.map((item) => (
        <option key={item} value={item} className="">
          {item}
        </option>
      ));
    }
    if (mark === 'rates') {
      return items.map((item) => {
        const {
          rateTypeId: { name },
          id,
        } = item;
        return (
          <option key={id} value={id} className="">
            {name}
          </option>
        );
      });
    }
    const key = mark === 'statuses' ? 'translation' : 'name';
    return items.map((item) => {
      const { id } = item;
      const name = item[key];
      return (
        <option key={id} value={id} className="">
          {name}
        </option>
      );
    });
  };
  const {
    values: { carId, rateId, dateFrom, dateTo },
    setFieldValue,
  } = useFormikContext();

  const currentCar = cars.find((car) => car.id === carId) || cars[0];

  const getPrice = (startDate, endDate) => {
    const {
      price,
      rateTypeId: { unit },
    } = rates.find((rate) => rate.id === rateId);
    const timeRange = endDate - startDate;
    if (unit === 'мин') {
      const minute = Math.floor(timeRange / 60000);
      const result = minute * price;
      return result;
    }
    if (unit === 'сутки') {
      const day = Math.ceil(timeRange / 86400000);
      const result = day * price;
      return result;
    }
    return null;
  };
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setFieldValue('price', getPrice(dateFrom, dateTo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateId]);

  return (
    <div className="order-popup">
      <div className="order-popup__label">Изменить заказ</div>
      <div className="order-popup__content">
        <label htmlFor="carId" className="order-popup__field-label">
          Автомобиль
          <Field name="carId" id="carId" as="select" className="order-popup__fieldButton">
            {renderSelect(cars)}
          </Field>
        </label>
        <label htmlFor="cityId" className="order-popup__field-label">
          Город
          <Field name="cityId" id="cityId" as="select" className="order-popup__fieldButton">
            {renderSelect(cities)}
          </Field>
        </label>
        <label htmlFor="pointId" className="order-popup__field-label">
          Адрес
          <Field name="pointId" id="pointId" as="select" className="order-popup__fieldButton">
            {renderSelect(points)}
          </Field>
        </label>
        <label htmlFor="color" className="order-popup__field-label">
          Цвет
          <Field name="color" id="color" as="select" className="order-popup__fieldButton">
            {renderSelect(currentCar.colors, 'colors')}
          </Field>
        </label>

        <label htmlFor="orderStatusId" className="order-popup__field-label">
          Статус
          <Field
            name="orderStatusId"
            id="orderStatusId"
            as="select"
            className="order-popup__fieldButton"
          >
            {renderSelect(statuses, 'statuses')}
          </Field>
        </label>
        <label htmlFor="rateId" className="order-popup__field-label">
          Тариф
          <Field name="rateId" id="rateId" as="select" className="order-popup__fieldButton">
            {renderSelect(rates, 'rates')}
          </Field>
        </label>

        <label htmlFor="order-popup__input" className="order-popup__field-label">
          C
          <DatePicker
            selected={dateFrom}
            onChange={(date) => {
              setFieldValue('dateFrom', Date.parse(date));
              setFieldValue('price', getPrice(Date.parse(date), dateTo));
            }}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="dd.MM.yyyy HH:mm"
            timeIntervals={5}
            customInput={
              <input id="order-popup__input" type="datetime" className="order-popup__fieldButton" />
            }
          />
        </label>
        <label htmlFor="order-popup__input" className="order-popup__field-label">
          По
          <DatePicker
            selected={dateTo}
            onChange={(date) => {
              setFieldValue('dateTo', Date.parse(date));
              setFieldValue('price', getPrice(dateFrom, Date.parse(date)));
            }}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="dd.MM.yyyy HH:mm"
            timeIntervals={5}
            minDate={dateFrom}
            customInput={
              <input id="order-popup__input" type="datetime" className="order-popup__fieldButton" />
            }
          />
        </label>
        <label htmlFor="price" className="order-popup__field-label">
          Цена
          <Field type="text" name="price" id="price" className="order-popup__fieldButton" />
        </label>
        <div className="order-popup__button-container">
          <button type="button" className={returnButtonClass} onClick={returnHandler}>
            Скрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
