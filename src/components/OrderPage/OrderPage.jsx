import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import './OrderPage.scss';
import SideBar from '../SideBar/Sidebar.jsx';
import Header from '../Header/Header.jsx';
import Navigator from './Navigator/Navigator.jsx';
import MapPage from './MapPage/MapPage.jsx';
import ModelPage from './ModelPage/ModelPage.jsx';
import OptionsPage from './OptionsPage/OptionsPage.jsx';
import TotalPage from './TotalPage/TotalPage.jsx';
import FinalPage from './FinalPage/FinalPage.jsx';

const OrderPage = () => {
  const { activeNav } = useSelector((state) => state.uiState);
  const orderId = localStorage.getItem('orderId');
  const path = `/order-page/order/${orderId}`;

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
                  <FinalPage />
                </div>
              )}
            />
          </Switch>
          <Switch>
            {orderId && <Redirect from="/order-page" to={`/order-page/order/${orderId}`} />}
            <Route exact path="/order-page">
              <div className="order-page__content">
                {activeNav === 0 && <MapPage />}
                {activeNav === 1 && <ModelPage />}
                {activeNav === 2 && <OptionsPage />}
                {activeNav === 3 && <TotalPage />}
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
