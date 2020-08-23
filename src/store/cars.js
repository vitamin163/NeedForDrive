/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cars',
  initialState: {
    isCarsLoaded: false,
    byId: {},
    allIds: [],
  },
  reducers: {
    addCars(state, { payload }) {
      const byId = payload.reduce((acc, car) => {
        const { id } = car;
        return { ...acc, [id]: car };
      }, {});
      const allIds = payload.map((car) => car.id);
      state.isCarsLoaded = true;
      state.byId = byId;
      state.allIds = allIds;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
