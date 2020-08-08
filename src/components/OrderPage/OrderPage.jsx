import React from 'react';
import { useSelector } from 'react-redux';
import './OrderPage.scss';
import SideBar from '../SideBar/Sidebar.jsx';
import Header from '../Header/Header.jsx';
import Navigator from './Navigator/Navigator.jsx';
import MapPage from './MapPage/MapPage.jsx';
import ModelPage from './ModelPage/ModelPage.jsx';
import OptionsPage from './OptionsPage/OptionsPage.jsx';
import TotalPage from './TotalPage/TotalPage.jsx';

const OrderPage = () => {
  const { activeNav } = useSelector((state) => state.uiState);
  return (
    <div className="order-page">
      <div className="order-page__wrapper">
        <div className="order-page__header">
          <Header />
          <Navigator />
        </div>
        <SideBar />
        <div className="order-page__content">
          {activeNav === 0 && <MapPage />}
          {activeNav === 1 && <ModelPage />}
          {activeNav === 2 && <OptionsPage />}
          {activeNav === 3 && <TotalPage />}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
