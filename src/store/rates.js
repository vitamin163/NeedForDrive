/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'rates',
  initialState: {
    isRatesLoaded: false,
    rates: [],
  },
  reducers: {
    addRates(state, { payload: { data } }) {
      state.isRatesLoaded = true;
      state.rates = data;
    },
    setRatesLoaded(state, { payload }) {
      state.isRatesLoaded = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
