/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'category',
  initialState: {
    isCategoryLoaded: false,
    category: [
      {
        name: 'Все модели',
        id: '',
      },
    ],
  },

  reducers: {
    addCategory(state, { payload: { data } }) {
      if (!state.isCategoryLoaded) {
        return { isCategoryLoaded: true, category: [...state.category, ...data] };
      }
      return state;
    },
    setCategoryLoaded(state, { payload }) {
      state.isCategoryLoaded = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
