import { createSlice } from '@reduxjs/toolkit';
import { actions as orderActions } from './order';

const slice = createSlice({
  name: 'locationsInput',
  initialState: {
    cityFilterValue: '',
    pointFilterValue: '',
    cityInputValue: '',
    pointInputValue: '',
  },
  reducers: {
    filterCity(state, { payload }) {
      return { ...state, cityFilterValue: payload };
    },
    filterPoint(state, { payload }) {
      return { ...state, pointFilterValue: payload };
    },
    addCityInputValue(state, { payload }) {
      return { ...state, cityInputValue: payload };
    },
    addPointInputValue(state, { payload }) {
      return { ...state, pointInputValue: payload };
    },
  },
  extraReducers: {
    [orderActions.deleteCityId]() {
      return {
        cityInputValue: '',
        cityFilterValue: '',
        pointInputValue: '',
        pointFilterValue: '',
      };
    },
    [orderActions.deletePointId](state) {
      return { ...state, pointInputValue: '', pointFilterValue: '' };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
