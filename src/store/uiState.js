import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'uiState',
  initialState: {
    activeNav: 0,
    popupIsOpen: false,
  },
  reducers: {
    changeActiveNav(state, { payload }) {
      return { ...state, activeNav: payload };
    },
    togglePopup(state, { payload }) {
      return { ...state, popupIsOpen: payload };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
