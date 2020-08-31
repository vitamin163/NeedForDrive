/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { roundToNearestMinutes } from 'date-fns';
import { actions as ratesActions } from './rates';
import { actions as orderStatusActions } from './orderStatus';

const init = {
  orderStatusId: {},
  cityId: {},
  pointId: {},
  carId: {},
  color: '',
  dateFrom: Date.parse(roundToNearestMinutes(new Date(), { nearestTo: 5 })),
  dateTo: 0,
  rateId: {},
  price: 0,
  isFullTank: false,
  isNeedChildChair: false,
  isRightWheel: false,
};
const slice = createSlice({
  name: 'order',
  initialState: {
    ...init,
  },
  reducers: {
    addCityId(state, { payload }) {
      state.cityId = payload;
    },
    addPointId(state, { payload }) {
      state.pointId = payload;
    },
    deleteCityId(state) {
      return { ...state, cityId: {}, pointId: {} };
    },
    deletePointId(state) {
      state.pointId = {};
    },
    addCarId(state, { payload }) {
      state.carId = payload;
    },
    addPrice(state, { payload }) {
      state.price = payload;
    },
    setDateFrom(state, { payload }) {
      state.dateFrom = payload;
    },
    setDateTo(state, { payload }) {
      state.dateTo = payload;
    },
    addColor(state, { payload }) {
      state.color = payload;
    },
    addRateId(state, { payload }) {
      state.rateId = payload;
    },
    setOptions(state, { payload: { option, value } }) {
      state[option] = value;
    },
    setOrder(state, { payload }) {
      return payload;
    },
    setDefaultOrder() {
      return init;
    },
  },
  extraReducers: {
    [ratesActions.addRates](state, { payload }) {
      const [rate] = payload;
      state.rateId = rate;
    },
    [orderStatusActions.addOrderStatus](state, { payload }) {
      const orderStatus = payload.find((item) => item.name === 'new');
      state.orderStatusId = orderStatus;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
