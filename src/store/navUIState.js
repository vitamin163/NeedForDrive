import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'navUIState',
  initialState: {
    active: 3,
  },
  reducers: {
    changeActive(state, { payload }) {
      return { ...state, active: payload };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
