import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'uiState',
  initialState: {
    popupIsOpen: false,
  },
  reducers: {
    togglePopup(state, { payload }) {
      return { ...state, popupIsOpen: payload };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
