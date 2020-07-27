import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Navigator.scss';
import cn from 'classnames';
import icons from '../../../JS/icons.js';

const Navigator = () => {
  const { navArrow } = icons;
  const { pointId } = useSelector((state) => state.order);

  const modelClass = cn({
    navigator__link: true,
    navigator__link_disable: !pointId.id,
  });

  return (
    <div className="order-page__navigator navigator">
      <nav className="navigator__nav">
        <ul className="navigator__link-container">
          <li className="navigator__link">
            <NavLink to="/location">Местоположение</NavLink>
            <img src={navArrow} alt="next" />
          </li>
          <li className={modelClass}>
            <NavLink to="/model">Модель</NavLink>
            <img src={navArrow} alt="next" />
          </li>
          <li className="navigator__link navigator__link_disable">
            <NavLink to="/options">Дополнительно</NavLink>
            <img src={navArrow} alt="next" />
          </li>
          <li className="navigator__link navigator__link_disable">
            <NavLink to="/total">Итого</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigator;
