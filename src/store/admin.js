/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

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
  },
  reducers: {
    setIdTimeout(state, { payload }) {
      state.idTimeout = payload;
    },
    addOrders(state, { payload }) {
      state.isOrdersLoaded = true;
      state.orders = payload.data;
      const totalPage = Math.ceil(payload.count / state.orderPageSize);
      state.totalOrdersPage = totalPage;
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
      // const dayAgo = payload.find((interval) => interval.name === 'За день');
      // state.orderPageFilter.byInterval = dayAgo.id;
    },
    setCurrentOrdersPage(state, { payload }) {
      state.currentOrdersPage = payload;
    },
  },
  extraReducers: {},
});

export const { actions } = slice;
export default slice.reducer;
