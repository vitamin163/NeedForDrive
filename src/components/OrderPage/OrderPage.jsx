import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import './OrderPage.scss';
import SideBar from '@Components/SideBar';
import Header from '@Components/Header';
import Navigator from './Navigator';
import MapPage from './MapPage';
import ModelPage from './ModelPage';
import OptionsPage from './OptionsPage';
import TotalPage from './TotalPage';
import FinalPage from './FinalPage';

const OrderPage = () => {
  const { activeNav } = useSelector((state) => state.uiState);
  const orderId = localStorage.getItem('orderId');
  const path = `/order-page/order/${orderId}`;
  const api = 'http://api-factory.simbirsoft1.com/api/db/';
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const headers = { 'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b' };
  return (
    <>
      <div className="order-page">
        <div className="order-page__wrapper">
          <div className="order-page__header">
            <Header />
            <hr className="top-line" />
            {orderId ? (
              <div className="order-page__order-number">
                Заказ номер {`RU${orderId.replace(/\D/g, '')}`}
              </div>
            ) : (
              <Navigator />
            )}
            <hr className="bottom-line" />
          </div>
          <SideBar />
          <Switch>
            <Route
              path={path}
              render={() => (
                <div className="order-page__content">
                  <FinalPage proxy={proxy} api={api} headers={headers} />
                </div>
              )}
            />
          </Switch>
          <Switch>
            {orderId && <Redirect from="/order-page" to={`/order-page/order/${orderId}`} />}
            <Route exact path="/order-page">
              <div className="order-page__content">
                {activeNav === 0 && <MapPage proxy={proxy} api={api} headers={headers} />}
                {activeNav === 1 && <ModelPage proxy={proxy} api={api} headers={headers} />}
                {activeNav === 2 && <OptionsPage proxy={proxy} api={api} headers={headers} />}
                {activeNav === 3 && <TotalPage proxy={proxy} api={api} headers={headers} />}
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
