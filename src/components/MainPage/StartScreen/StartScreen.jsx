import React from 'react';
import { NavLink } from 'react-router-dom';
import './StartScreen.scss';
import Header from '../../Header/Header.jsx';

const StartScreen = () => (
  <div className="start-screen">
    <Header />
    <main className="start-screen__content content">
      <div className="content__title">Каршеринг</div>
      <div className="content__name">Need for drive</div>
      <div className="content__subtitle">Поминутная аренда авто твоего города</div>
      <NavLink to="/order-page">
        <button className="content__reservation-button">Забронировать</button>
      </NavLink>
    </main>

    <div className="start-screen__footer footer">
      <div className="footer__copyright">© 2016-2019 «Need for drive»</div>
      <a href="tel:84952342244" className="footer__number">
        8(495) 234-22-44
      </a>
    </div>
  </div>
);
export default StartScreen;
