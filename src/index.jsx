import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import reducers from './store';
import './scss/style.scss';

const store = configureStore({
  reducer: reducers,
});

render(
  <Provider store={store}>
    <BrowserRouter basename="/NeedForDrive">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
