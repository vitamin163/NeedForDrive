import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'uiState',
  initialState: {
    activeNav: 0,
    categoryModelId: 0,
    popupIsOpen: false,
    dropdownIsOpen: false,
  },
  reducers: {
    changeActiveNav(state, { payload }) {
      return { ...state, activeNav: payload };
    },
    changeModelCategory(state, { payload }) {
      return { ...state, categoryModelId: payload };
    },
    togglePopup(state, { payload }) {
      return { ...state, popupIsOpen: payload };
    },
    toggleDropdown(state) {
      return { ...state, dropdownIsOpen: !state.dropdownIsOpen };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
