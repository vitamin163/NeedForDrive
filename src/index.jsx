import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HashRouter } from 'react-router-dom';
import App from './components/App/App.jsx';
import reducers, { actions } from './store';
import './scss/style.scss';

const store = configureStore({
  reducer: reducers,
});
const { setOrder } = actions;
const order = localStorage.getItem('order');
if (order) {
  store.dispatch(setOrder(JSON.parse(order)));
}
render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
