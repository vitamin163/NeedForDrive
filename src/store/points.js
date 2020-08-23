/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'points',
  initialState: {
    byId: {},
    allIds: [],
    isPointsLoaded: false,
  },
  reducers: {
    addPoints(state, { payload }) {
      state.isPointsLoaded = true;
      const byId = payload.reduce((acc, point) => {
        const { id } = point;
        return { ...acc, [id]: point };
      }, {});
      const allIds = payload.map((point) => point.id);
      state.byId = byId;
      state.allIds = allIds;
    },
    setStatePointsRequest(state, { payload }) {
      state.initPoints = true;
      state.requestPointsState = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
