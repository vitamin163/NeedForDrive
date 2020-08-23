/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cities',
  initialState: {
    isCitiesLoaded: false,
    byId: {},
    allIds: [],
  },
  reducers: {
    addCities(state, { payload }) {
      state.isCitiesLoaded = true;
      const byId = payload.reduce((acc, city) => {
        const { id } = city;
        return { ...acc, [id]: city };
      }, {});
      const allIds = payload.map((city) => city.id);
      state.byId = byId;
      state.allIds = allIds;
    },
    setStateCitiesRequest(state, { payload }) {
      state.initCities = true;
      state.requestCitiesState = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
