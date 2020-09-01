import React from 'react';
import './Authorization.scss';
import { logo } from '../../../icon';

const Authorization = () => {
  return (
    <div className="admin-panel__authorization authorization">
      <div className="authorization__label-container">
        <img className="authorization__logo" src={logo} alt="logo" />
        <h2 className="authorization__label">Need for drive</h2>
      </div>
      <div className="authorization__auth-block">
        <h3 className="authorization__name">Вход</h3>
        <form className="authorization__form">
          <div className="authorization__input-name">Почта</div>
          <input type="email" />
          <div className="authorization__input-name">Пароль</div>
          <input type="password" />
          <div className="authorization__button-container">
            <button className="authorization__auth-link">Запросить доступ</button>
            <button className="authorization__submit-button" type="submit">
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Authorization;
