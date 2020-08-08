import { combineReducers } from 'redux';
import sidebar, { actions as sidebarActions } from './sidebar';
import slides from './slides';
import points, { actions as pointsActions } from './points';
import order, { actions as orderActions } from './order';
import cars, { actions as carsActions } from './cars';
import locationsInput, { actions as locationsInputActions } from './locationsInput';
import cities, { actions as citiesActions } from './cities';
import category, { actions as categoryActions } from './category';
import uiState, { actions as uiStateActions } from './uiState';

export default combineReducers({
  sidebar,
  slides,
  points,
  locationsInput,
  order,
  cars,
  cities,
  category,
  uiState,
});

const actions = {
  ...sidebarActions,
  ...locationsInputActions,
  ...orderActions,
  ...pointsActions,
  ...carsActions,
  ...citiesActions,
  ...categoryActions,
  ...uiStateActions,
};

export { actions };
