/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cities',
  initialState: {
    isCitiesLoaded: false,
    cities: [],
  },
  reducers: {
    addCities(state, { payload: { data } }) {
      state.isCitiesLoaded = true;
      state.cities = data;
    },
    setCitiesLoaded(state, { payload }) {
      state.isCitiesLoaded = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
