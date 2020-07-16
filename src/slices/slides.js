import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'slides',
  initialState: [
    {
      img: 'assets/img/tesla.jpg',
      header: 'Бесплатная парковка',
      title: 'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах',
    },
    {
      img: 'assets/img/ferrari.jpg',
      header: 'Страховка',
      title: 'Полная страховка страховка автомобиля',
    },
    {
      img: 'assets/img/porsche.jpg',
      header: 'Бензин',
      title: 'Полный бак на любой заправке города за наш счёт',
    },
    {
      img: 'assets/img/nissan.jpg',
      header: 'Обслуживание',
      title: 'Автомобиль проходит еженедельное ТО',
    },
  ],
  reducers: {},
});
export const { actions } = slice;
export default slice.reducer;
