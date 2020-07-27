import React from 'react';
import { Route } from 'react-router-dom';
import './OrderPage.scss';
import SideBar from '../SideBar/Sidebar.jsx';
import Header from '../Header/Header.jsx';
import Navigator from './Navigator/Navigator.jsx';
import MapPage from './MapPage/MapPage.jsx';

const OrderPage = () => (
  <div className="order-page">
    <div className="order-page__wrapper">
      <SideBar />
      <Header />
      <Navigator />
      <div className="order-page__content">
        <Route path="/location" component={MapPage} />
      </div>
    </div>
  </div>
);

export default OrderPage;
