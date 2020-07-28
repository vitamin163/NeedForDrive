import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Sidebar.scss';
import cn from 'classnames';
import icons from '../../icon';
import { actions } from '../../store';

const Sidebar = () => {
  const { closeButton } = icons;
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.sidebar);
  const { openMenu } = actions;

  const sidebarClass = cn({
    sidebar: true,
    sidebar_opened: isOpen,
    sidebar_closed: !isOpen,
  });
  const langBtnClass = cn({
    'sidebar__lang-btn': true,
    'lang-btn': true,
    'lang-btn_hide': isOpen,
    'lang-btn_show': !isOpen,
  });

  const burgerBtnClass = cn({
    'sidebar__burger-btn': true,
    'burger-btn': true,
    'burger-btn_show': !isOpen,
    'burger-btn_hide': isOpen,
  });

  const burgerIconClass = cn({
    'burger-btn__icon': true,
    'burger-btn__icon_show': !isOpen,
    'burger-btn__icon_hide': isOpen,
  });

  const closeBtnClass = cn({
    'sidebar__close-btn': true,
    'close-btn': true,
    'close-btn_show': isOpen,
    'close-btn_hide': !isOpen,
  });

  const menuClass = cn({
    sidebar__menu: true,
    menu: true,
    menu_show: isOpen,
    menu_hide: !isOpen,
  });

  const openMenuHandler = () => {
    dispatch(openMenu(true));
  };

  const closeMenuHandler = () => {
    dispatch(openMenu(false));
  };
  const renderLinks = () => {
    const liElements = ['ПАРКОВКА', 'СТРАХОВКА', 'БЕНЗИН', 'ОБСЛУЖИВАНИЕ'].map((text, i) => (
      <li className="nav__link" key={i}>
        {text}
      </li>
    ));
    return liElements;
  };

  return (
    <div className={sidebarClass}>
      <button className={burgerBtnClass} onClick={() => openMenuHandler()} alt="menu button">
        {
          <svg
            className={burgerIconClass}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 8H28"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 16H28"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 24H28"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      </button>

      <button className={langBtnClass} alt="language button">
        Eng
      </button>

      <button className={closeBtnClass} onClick={() => closeMenuHandler()}>
        <img src={closeButton} alt="close" />
      </button>
      <div className={menuClass}>
        <nav className="sidebar__nav nav">
          <ul className="nav__link-container">{renderLinks()}</ul>
          <div className="nav__icon-container">
            <a className="nav__social" href="https://telegram.org/">
              <span className="nav__icon nav__icon-telegram"></span>
            </a>
            <a className="nav__social" href="https://ru-ru.facebook.com/">
              <span className="nav__icon nav__icon-facebook"></span>
            </a>
            <a className="nav__social" href="https://www.instagram.com/">
              <span className="nav__icon nav__icon-instagram"></span>
            </a>
          </div>
        </nav>
        <div className="cover"></div>
      </div>
    </div>
  );
};

export default Sidebar;
