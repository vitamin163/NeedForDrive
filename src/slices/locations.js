/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'locations',
  initialState: {
    cities: [],
    points: [],
  },
  reducers: {
    addCities(state, { payload }) {
      state.cities = payload;
    },
    addPoints(state, { payload }) {
      state.points = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
