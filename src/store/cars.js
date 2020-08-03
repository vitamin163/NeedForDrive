import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cars',
  initialState: {
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
      return { byId, allIds };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
