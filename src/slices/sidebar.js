import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openMenu(state, { payload }) {
      return { ...state, isOpen: payload };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
