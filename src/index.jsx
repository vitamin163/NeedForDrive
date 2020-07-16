import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App/App.jsx';
import reducers from './slices';
import './scss/style.scss';

const store = configureStore({
  reducer: reducers,
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
