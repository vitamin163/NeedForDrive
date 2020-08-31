/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'points',
  initialState: {
    isPointsLoaded: false,
    points: [],
  },
  reducers: {
    addPoints(state, { payload }) {
      state.isPointsLoaded = true;
      state.points = payload;
    },
    setStatePointsRequest(state, { payload }) {
      state.initPoints = true;
      state.requestPointsState = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
