/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'rates',
  initialState: {
    isRatesLoaded: false,
    rates: [],
  },
  reducers: {
    addRates(state, { payload }) {
      state.isRatesLoaded = true;
      state.rates = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;