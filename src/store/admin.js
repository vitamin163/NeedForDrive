/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as carsActions } from './cars';

const slice = createSlice({
  name: 'admin',
  initialState: {
    intervals: [],
    idTimeout: '',
    orders: [],
    isOrdersLoaded: false,
    orderPageSize: 3,
    currentOrdersPage: 0,
    totalOrdersPage: 0,
    carsPageSize: 5,
    currentCarsPage: 0,
    totalCarsPage: 0,
  },
  reducers: {
    setIdTimeout(state, { payload }) {
      state.idTimeout = payload;
    },
    addOrders(state, { payload }) {
      const { orderPageSize, currentOrdersPage } = state;
      state.isOrdersLoaded = true;
      state.orders = payload.data;
      const totalPage = Math.ceil(payload.count / orderPageSize);
      state.totalOrdersPage = totalPage;
      if (totalPage <= currentOrdersPage) {
        state.currentOrdersPage = 0;
      }
    },
    changeOrder(state, { payload }) {
      const updateOrders = state.orders.map((order) => {
        if (order.id === payload.id) {
          return payload;
        }
        return order;
      });
      state.orders = updateOrders;
    },
    setIntervals(state, { payload }) {
      state.intervals = payload;
    },
    setCurrentPage(state, { payload: { page, name } }) {
      state[name] = page;
    },
  },
  extraReducers: {
    [carsActions.addCars](state, { payload }) {
      const { carsPageSize, currentCarsPage } = state;
      const totalPage = Math.ceil(payload.count / carsPageSize);
      state.totalCarsPage = totalPage;
      if (totalPage <= currentCarsPage) {
        state.currentCarsPage = 0;
      }
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
