import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HashRouter } from 'react-router-dom';
import App from './components/App/App.jsx';
import reducers from './store';
import './scss/style.scss';

const store = configureStore({
  reducer: reducers,
});

render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
