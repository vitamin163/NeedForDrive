import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../MainPage/MainPage.jsx';
import OrderPage from '../OrderPage/OrderPage.jsx';
import AdminPanel from '../AdminPanel/AdminPanel.jsx';
import './App.scss';

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/order-page" component={OrderPage} />
        <Route path="/admin" component={AdminPanel} />
      </Switch>
    </div>
  );
};

export default App;
