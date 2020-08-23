/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'rates',
  initialState: {
    isRatesLoaded: false,
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
      state.isRatesLoaded = true;
      state.byId = byId;
      state.allIds = allIds;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
