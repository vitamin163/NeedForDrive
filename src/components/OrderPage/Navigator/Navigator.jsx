import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Navigator.scss';
import cn from 'classnames';
import icons from '../../../icon';
import { actions } from '../../../store';

const Navigator = () => {
  const dispatch = useDispatch();
  const { changeActive } = actions;
  const { navArrow } = icons;
  const { pointId, carId } = useSelector((state) => state.order);
  const { active } = useSelector((state) => state.navUIState);

  const getClass = (id, condition) => {
    return cn({
      navigator__link: true,
      navigator__link_active: active === id,
      navigator__link_disable: condition,
    });
  };

  const navLinkHandler = (activeLink) => {
    dispatch(changeActive(activeLink));
  };

  return (
    <div className="order-page__navigator navigator">
      <nav className="navigator__nav">
        <ul className="navigator__link-container">
          <li className={getClass(0, false)}>
            <button onClick={() => navLinkHandler(0)}>Местоположение</button>
            <img src={navArrow} alt="next" />
          </li>
          <li className={getClass(1, !pointId.id)}>
            <button onClick={() => navLinkHandler(1)}>Модель</button>
            <img src={navArrow} alt="next" />
          </li>
          <li className={getClass(2, !carId.id)}>
            <button onClick={() => navLinkHandler(2)}>Дополнительно</button>
            <img src={navArrow} alt="next" />
          </li>
          <li className="navigator__link navigator__link_disable">
            <button onClick={() => navLinkHandler(3)}>Итого</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigator;
