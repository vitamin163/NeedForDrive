/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'points',
  initialState: {
    isPointsLoaded: false,
    points: [],
  },
  reducers: {
    addPoints(state, { payload: { data } }) {
      state.isPointsLoaded = true;
      state.points = data;
    },
    setPointsLoaded(state, { payload }) {
      state.isPointsLoaded = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
