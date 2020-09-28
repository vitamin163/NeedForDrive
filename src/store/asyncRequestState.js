/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'asyncRequestState',
  initialState: {
    requestState: null,
    error: '',
  },
  reducers: {
    setRequestState(state, { payload }) {
      state.requestState = payload;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
