import { combineReducers } from 'redux';
import sidebar, { actions as sidebarActions } from './sidebar';
import slides from './slides';
import locations, { actions as locationsActions } from './locations';
import order, { actions as orderActions } from './order';
import locationsInput, { actions as locationsInputActions } from './locationsInput';

export default combineReducers({
  sidebar,
  slides,
  locations,
  locationsInput,
  order,
});

const actions = {
  ...sidebarActions,
  ...locationsInputActions,
  ...orderActions,
  ...locationsActions,
};

export { actions };
