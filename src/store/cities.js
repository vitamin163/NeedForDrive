/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cities',
  initialState: {
    isCitiesLoaded: false,
    cities: [],
  },
  reducers: {
    addCities(state, { payload }) {
      state.isCitiesLoaded = true;
      state.cities = payload;
    },
    setStateCitiesRequest(state, { payload }) {
      state.initCities = true;
      state.requestCitiesState = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
