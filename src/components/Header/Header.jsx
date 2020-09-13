import React from 'react';
import { place } from '@/icon';
import './Header.scss';

const Header = () => {
  return (
    <header className="start-screen__header header">
      <div className="header__logo">Need for drive</div>
      <div className="header__location">
        <img src={place} alt="location" />
        <span className="header__place">Ульяновск</span>
      </div>
    </header>
  );
};
export default Header;
