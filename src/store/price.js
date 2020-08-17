/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'price',
  initialState: {
    rent: 0,
    other: 0,
    amount: 0,
  },
  reducers: {
    addRentPrice(state, { payload }) {
      state.rent = payload;
      const amount = state.other + payload;
      state.amount = amount;
    },
    addOtherPrice(state, { payload }) {
      const currentOther = state.other + payload;
      state.other = currentOther;
      const amount = state.rent + currentOther;
      state.amount = amount;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
