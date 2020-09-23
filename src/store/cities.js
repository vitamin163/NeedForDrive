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
    setStateCitiesRequest(state, { payload }) {
      state.requestCitiesState = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
