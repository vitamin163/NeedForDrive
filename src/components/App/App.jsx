import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import '../scss/App.scss';
import MainPage from '../MainPage/MainPage.jsx';
import OrderPage from '../OrderPage/OrderPage.jsx';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/location" component={OrderPage} />
    </Switch>
  </div>
);

export default App;
