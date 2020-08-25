/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'orderStatus',
  initialState: {
    isOrderStatusLoaded: false,
    statuses: [],
  },
  reducers: {
    addOrderStatus(state, { payload }) {
      state.isOrderStatusLoaded = true;
      state.statuses = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
