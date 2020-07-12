import React from 'react';
import './MainPage.scss';
import SideBar from './SideBar/Sidebar.jsx';
import StartScreen from './StartScreen/StartScreen.jsx';
import Slider from './Slider/Slider.jsx';

const MainPage = () => (
  <div className="main-page">
    <SideBar />
    <StartScreen />
    <Slider />
  </div>
);

export default MainPage;
