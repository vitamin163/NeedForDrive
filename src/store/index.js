import { combineReducers } from 'redux';
import sidebar, { actions as sidebarActions } from './sidebar';
import slides from './slides';
import points, { actions as pointsActions } from './points';
import order, { actions as orderActions } from './order';
import navUIState, { actions as navUIStateActions } from './navUIState';
import cars, { actions as carsActions } from './cars';
import locationsInput, { actions as locationsInputActions } from './locationsInput';
import cities, { actions as citiesActions } from './cities';
import modelUIState, { actions as modelUIStateActions } from './modelUIState';
import category, { actions as categoryActions } from './category';
import uiState, { actions as uiStateActions } from './uiState';

export default combineReducers({
  sidebar,
  slides,
  points,
  locationsInput,
  order,
  navUIState,
  cars,
  modelUIState,
  cities,
  category,
  uiState,
});

const actions = {
  ...sidebarActions,
  ...locationsInputActions,
  ...orderActions,
  ...pointsActions,
  ...navUIStateActions,
  ...carsActions,
  ...modelUIStateActions,
  ...citiesActions,
  ...categoryActions,
  ...uiStateActions,
};

export { actions };
