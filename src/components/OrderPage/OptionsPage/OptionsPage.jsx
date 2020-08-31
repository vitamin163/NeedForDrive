import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { roundToNearestMinutes } from 'date-fns';
import './OptionsPage.scss';
import { actions } from '../../../store';
import Order from '../Order/Order.jsx';
import Input from '../../Input/Input.jsx';
import Spinner from '../../Spinner/Spinner.jsx';
import { getMaxRentTime } from '../../../utils';
import DateInput from './DateInput.jsx';
import Colors from './Colors.jsx';
import Rates from './Rates.jsx';
import Other from './Other.jsx';
import Error from '../../Error/Error.jsx';

const OptionsPage = () => {
  const dispatch = useDispatch();
  const { carId, rateId, dateFrom, dateTo } = useSelector((state) => state.order);
  const { amount } = useSelector((state) => state.price);
  const { isRatesLoaded, rates } = useSelector((state) => state.rates);
  const { requestState } = useSelector((state) => state.asyncRequestState);

  const unitRate = rateId.id && rateId.rateTypeId.unit;
  const priceRate = rateId.id && rateId.price;
  const colors = ['Любой', ...carId.colors];

  const {
    changeActiveNav,
    addPrice,
    setDateFrom,
    setDateTo,
    addColor,
    addRates,
    addRentPrice,
    setRequestState,
  } = actions;

  const maxOtherPrice = 2300;
  const maxRentPrice = carId.priceMax - maxOtherPrice;

  const { d: maxRentDay, h: maxTimeHour, m: maxTimeMinute } = getMaxRentTime(
    unitRate,
    maxRentPrice,
    priceRate,
    dateFrom,
  );

  const endDate = new Date(dateFrom).setDate(new Date(dateFrom).getDate() + maxRentDay);

  const isStartEqualsEnd = new Date(dateFrom).getDate() === new Date(dateTo).getDate();
  const isSelectedDateEndDay = new Date(dateTo).getDate() === new Date(endDate).getDate();

  const startDate = new Date();
  const startTime = {
    minHour: startDate.getHours(),
    minMinute: startDate.getMinutes(),
  };
  const getEndTime = () => {
    const endTime = {
      minHour: 0,
      minMinute: 0,
      maxHour: 23,
      maxMinute: 55,
    };
    if (isStartEqualsEnd) {
      endTime.minHour = new Date(dateFrom).getHours();
      endTime.minMinute = new Date(dateFrom).getMinutes();
      return endTime;
    }
    if (isSelectedDateEndDay) {
      endTime.maxHour = maxTimeHour;
      endTime.maxMinute = maxTimeMinute;
      return endTime;
    }
    return endTime;
  };

  const rentPriceHandler = (start, end, unit, price) => {
    const endDateByMaxTime = new Date(endDate).setHours(
      getEndTime().maxHour,
      getEndTime().maxMinute,
      0,
      0,
    );
    if (end > endDateByMaxTime) {
      return dispatch(setDateTo(endDateByMaxTime));
    }
    const timeRange = end - start;
    if (unit === 'мин') {
      const minute = Math.floor(timeRange / 60000);
      const result = minute * price;
      return result > maxRentPrice ? dispatch(setDateTo(start)) : dispatch(addRentPrice(result));
    }

    if (unit === 'сутки') {
      const day = Math.ceil(timeRange / 86400000);
      const result = day * price;
      return result > maxRentPrice ? dispatch(setDateTo(start)) : dispatch(addRentPrice(result));
    }
    return false;
  };
  useEffect(() => {
    dispatch(addColor(colors[1]));
    rentPriceHandler(dateFrom, dateTo, unitRate, priceRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFrom, dateTo, rateId]);

  useEffect(() => {
    if (isRatesLoaded) {
      dispatch(setRequestState('SUCCESS'));
    }
    const getRates = async () => {
      dispatch(setRequestState('REQUEST'));
      try {
        const {
          data: { data: dataRate },
        } = await axios.get(
          'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/rate/',
          {
            headers: {
              'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
              Authorization: 'Bearer 4cbcea96de',
            },
          },
        );
        dispatch(addRates(dataRate));
        dispatch(setRequestState('SUCCESS'));
      } catch (error) {
        console.log(error);
        dispatch(setRequestState('FAILURE'));
      }
    };

    if (!isRatesLoaded) {
      getRates();
    }

    return () => {
      dispatch(setRequestState(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDateFromHandler = (date) => {
    const timestamp = Date.parse(date);
    if (timestamp > dateTo) {
      dispatch(setDateFrom(timestamp));
      return dispatch(setDateTo(timestamp));
    }
    return dispatch(setDateFrom(timestamp));
  };

  const isSelectedStartDate = new Date(dateFrom).getDate() === startDate.getDate();

  if (!isSelectedStartDate) {
    startTime.minHour = 0;
    startTime.minMinute = 0;
  }

  const setDateToHandler = (date) => {
    const timestamp = Date.parse(date);
    dispatch(setDateTo(timestamp));
  };

  return (
    <>
      {requestState === 'REQUEST' && <Spinner />}
      {requestState === 'SUCCESS' && (
        <div className="order-page__options-page options-page">
          <Colors colors={colors} />
          <div className="options-page__label">Дата аренды</div>
          <div className="options-page__rent">
            <DateInput
              selected={dateFrom}
              minDate={startDate}
              minTime={new Date().setHours(startTime.minHour, startTime.minMinute, 0, 0)}
              maxTime={new Date(new Date().setHours(23, 55, 0, 0))}
              onChange={setDateFromHandler}
              customInput={
                <Input
                  label="C"
                  type="datetime"
                  change={() => {}}
                  click={() => {
                    setDateFromHandler(roundToNearestMinutes(new Date(), { nearestTo: 5 }));
                  }}
                />
              }
            />
            <DateInput
              selected={dateTo}
              minDate={dateFrom}
              maxDate={endDate}
              minTime={new Date().setHours(getEndTime().minHour, getEndTime().minMinute, 0, 0)}
              maxTime={new Date().setHours(getEndTime().maxHour, getEndTime().maxMinute, 0, 0)}
              onChange={setDateToHandler}
              customInput={
                <Input
                  label="По"
                  type="datetime"
                  change={() => {}}
                  click={() => {
                    setDateToHandler(new Date(0));
                  }}
                />
              }
            />
          </div>
          <Rates rates={rates} />
          <Other />
        </div>
      )}
      {requestState === 'FAILURE' && <Error text="Не удалось получить данные" />}
      <Order
        buttonName="Итого"
        disabled={dateFrom >= dateTo || amount === 0}
        click={() => {
          dispatch(addPrice(amount));
          dispatch(changeActiveNav(3));
        }}
      />
    </>
  );
};

export default OptionsPage;
