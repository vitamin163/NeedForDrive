import React from 'react';
import { useSelector } from 'react-redux';
import './OrderPage.scss';
import SideBar from '../SideBar/Sidebar.jsx';
import Header from '../Header/Header.jsx';
import Navigator from './Navigator/Navigator.jsx';
import MapPage from './MapPage/MapPage.jsx';
import ModelPage from './ModelPage/ModelPage.jsx';

const OrderPage = () => {
  const { active } = useSelector((state) => state.navUIState);
  return (
    <div className="order-page">
      <div className="order-page__wrapper">
        <SideBar />
        <Header />
        <Navigator />
        <div className="order-page__content">
          {active === 0 && <MapPage />}
          {active === 1 && <ModelPage />}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
