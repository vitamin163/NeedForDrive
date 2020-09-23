/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cars',
  initialState: {
    isCarsLoaded: false,
    cars: [],
  },
  reducers: {
    addCars(state, { payload: { data } }) {
      state.isCarsLoaded = true;
      console.log('CARS LOADED');
      state.cars = data;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
