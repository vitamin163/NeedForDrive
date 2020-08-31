/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cars',
  initialState: {
    isCarsLoaded: false,
    cars: [],
  },
  reducers: {
    addCars(state, { payload }) {
      state.isCarsLoaded = true;
      state.cars = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
