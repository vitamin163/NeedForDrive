import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'rates',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    addRates(state, { payload }) {
      const byId = payload.reduce((acc, rate) => {
        const { id } = rate;
        return { ...acc, [id]: rate };
      }, {});
      const allIds = payload.map((rate) => rate.id);
      return { byId, allIds };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
