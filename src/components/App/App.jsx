import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../MainPage/MainPage.jsx';
import OrderPage from '../OrderPage/OrderPage.jsx';

const App = () => (
  <div className="app">
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/order-page" component={OrderPage} />
    </Switch>
  </div>
);

export default App;
