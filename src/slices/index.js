import { combineReducers } from 'redux';
import sidebar, { actions as sidebarActions } from './sidebar';
import slides from './slides';

export default combineReducers({
  sidebar,
  slides,
});

const actions = {
  ...sidebarActions,

};

export { actions };
