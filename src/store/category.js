import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'category',
  initialState: [
    {
      name: 'Все модели',
      id: 0,
    },
  ],
  reducers: {
    addCategory(state, { payload: { data } }) {
      return [...state, ...data];
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
