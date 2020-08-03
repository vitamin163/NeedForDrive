import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cities',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    addCities(state, { payload }) {
      const byId = payload.reduce((acc, city) => {
        const { id } = city;
        return { ...acc, [id]: city };
      }, {});
      const allIds = payload.map((city) => city.id);
      return { byId, allIds };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
