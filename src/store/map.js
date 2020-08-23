/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'map',
  initialState: {
    isYMapsLoaded: false,
    isYMapsCreated: false,
    points: [],
    defaultCoords: [54.314192, 48.403123],
  },
  reducers: {
    setLoadState(state, { payload }) {
      state.isYMapsLoaded = payload;
    },
    setStateMapCreated(state, { payload }) {
      state.isYMapsCreated = payload;
    },
    setPoints(state, { payload }) {
      state.points = payload;
    },
    setDefaultCoords(state, { payload }) {
      state.defaultCoords = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
