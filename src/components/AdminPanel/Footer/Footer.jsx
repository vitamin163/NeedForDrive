import React from 'react';
import './Footer.scss';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__links">
        <NavLink className="footer__link" to="/">
          Главная страница
        </NavLink>
        <NavLink className="footer__link" to="#">
          Ссылка
        </NavLink>
      </div>
      <div className="footer__copyright">Copyright © 2020 Simbirsoft</div>
    </div>
  );
};

export default Footer;
