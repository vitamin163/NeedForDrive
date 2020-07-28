import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'points',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    addPoints(state, { payload }) {
      const byId = payload.reduce((acc, point) => {
        const { id } = point;
        return { ...acc, [id]: point };
      }, {});
      const allIds = payload.map((point) => point.id);
      return { byId, allIds };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
