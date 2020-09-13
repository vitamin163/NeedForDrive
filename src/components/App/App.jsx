import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '@Components/MainPage';
import OrderPage from '@Components/OrderPage';
import AdminPanel from '@Components/AdminPanel';

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
