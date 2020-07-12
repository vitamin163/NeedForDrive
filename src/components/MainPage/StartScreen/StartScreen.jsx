import React from 'react';
import place from '../../../img/location.svg';
import './StartScreen.scss';

const StartScreen = () => (
  <div className="start-screen">
    <header className="start-screen__header header">
      <div className="header__logo">Need for drive</div>
      <div className="header__location">
        <img src={place} alt='location' />
        <span className='header__place'>Ульяновск</span>
      </div>
    </header>
    <main className="start-screen__content content">
      <div className="content__title">Каршеринг</div>
      <div className="content__name">Need for drive</div>
      <div className="content__subtitle">Поминутная аренда авто твоего города</div>
      <button className='content__reservation-button'>Забронировать</button>
    </main>

    <div className="start-screen__footer footer">
      <div className="footer__copyright">© 2016-2019 «Need for drive»</div>
      <div className="footer__number">8(495) 234-22-44</div>
    </div>
  </div>
);
export default StartScreen;
