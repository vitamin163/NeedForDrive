/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { translateOrderStatus } from '@/utils';

const slice = createSlice({
  name: 'orderStatus',
  initialState: {
    isOrderStatusLoaded: false,
    statuses: [],
  },
  reducers: {
    addOrderStatus(state, { payload: { data } }) {
      state.isOrderStatusLoaded = true;
      const addedTranslation = data.map((status) => {
        const translation = translateOrderStatus(status);
        return { ...status, translation };
      });
      state.statuses = addedTranslation;
    },
    setOrderStatusLoaded(state, { payload }) {
      state.isOrderStatusLoaded = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
