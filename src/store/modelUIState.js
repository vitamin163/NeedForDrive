import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modelUIState',
  initialState: {
    categoryId: 0,
  },
  reducers: {
    changeCategory(state, { payload }) {
      return { ...state, categoryId: payload };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
