import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Navigator.scss';
import cn from 'classnames';
import { navArrow } from '../../../icon';
import { actions } from '../../../store';

const Navigator = () => {
  const dispatch = useDispatch();
  const { changeActiveNav } = actions;
  const { pointId, carId, dateFrom, dateTo } = useSelector((state) => state.order);
  const { activeNav } = useSelector((state) => state.uiState);

  const getClass = (id, condition) => {
    return cn({
      navigator__link: true,
      navigator__link_active: activeNav === id,
      navigator__link_disable: condition,
    });
  };

  const navLinkHandler = (activeLink) => {
    dispatch(changeActiveNav(activeLink));
  };
  const items = [
    { name: 'Местоположение', className: getClass(0, false) },
    { name: 'Модель', className: getClass(1, !pointId.id) },
    { name: 'Дополнительно', className: getClass(2, !carId.id || !pointId.id) },
    { name: 'Итого', className: getClass(3, !carId.id || !pointId.id || dateFrom >= dateTo) },
  ];

  return (
    <>
      <div className="order-page__navigator navigator">
        <nav className="navigator__nav">
          <ul className="navigator__link-container">
            {items.map((item, i) => {
              const { name, className } = item;
              return (
                <li key={name} className={className}>
                  <button onClick={() => navLinkHandler(i)}>{name}</button>
                  {i !== items.length - 1 && <img src={navArrow} alt="next" />}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigator;
