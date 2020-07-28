/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'order',
  initialState: {
    orderStatusId: {},
    cityId: {},
    pointId: {},
    carId: {},
    color: 'string',
    dateFrom: 0,
    dateTo: 0,
    rateId: {},
    price: 0,
    isFullTank: true,
    isNeedChildChair: true,
    isRightWheel: true,
  },
  reducers: {
    addCityId(state, { payload }) {
      state.cityId.id = payload;
    },
    addPointId(state, { payload }) {
      state.pointId.id = payload;
    },
    deleteCityId(state) {
      return { ...state, cityId: {}, pointId: {} };
    },
    deletePointId(state) {
      state.pointId = {};
    },
    addCarId(state, { payload }) {
      state.carId.id = payload;
    },
    addPrice(state, { payload }) {
      state.price = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
