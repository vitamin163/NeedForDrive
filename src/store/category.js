import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'category',
  initialState: {
    'Все модели': {
      name: 'Все модели',
      id: 0,
    },
  },
  reducers: {
    addCategory(state, { payload }) {
      const [category1, category2] = payload;
      return { ...state, [category1.name]: category1, [category2.name]: category2 };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
