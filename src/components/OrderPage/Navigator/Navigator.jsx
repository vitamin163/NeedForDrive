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
  const items = [
    { name: 'Местоположение', className: getClass(0, false), img: navArrow },
    { name: 'Модель', className: getClass(1, !pointId.id), img: navArrow },
    { name: 'Дополнительно', className: getClass(2, !carId.id), img: navArrow },
    { name: 'Итого', className: getClass(3, true), img: false },
  ];

  return (
    <>
      <div className="order-page__navigator navigator">
        <hr />
        <nav className="navigator__nav">
          <ul className="navigator__link-container">
            {items.map((item, i) => {
              const { name, className, img } = item;
              return (
                <li key={i} className={className}>
                  <button onClick={() => navLinkHandler(i)}>{name}</button>
                  {img && <img src={img} alt="next" />}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <hr />
    </>
  );
};

export default Navigator;
