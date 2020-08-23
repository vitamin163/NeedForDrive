import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Sidebar.scss';
import cn from 'classnames';
import { closeButton, Telegram, Facebook, Instagram, Burger } from '../../icon';
import { actions } from '../../store';

console.log(closeButton);

const Sidebar = () => {
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
    const liElements = ['ПАРКОВКА', 'СТРАХОВКА', 'БЕНЗИН', 'ОБСЛУЖИВАНИЕ'].map((text) => (
      <li className="nav__link" key={text}>
        {text}
      </li>
    ));
    return liElements;
  };

  return (
    <div className={sidebarClass}>
      <button className={burgerBtnClass} onClick={() => openMenuHandler()} alt="menu button">
        <Burger />
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
              <Telegram />
            </a>
            <a className="nav__social" href="https://ru-ru.facebook.com/">
              <Facebook />
            </a>
            <a className="nav__social" href="https://www.instagram.com/">
              <Instagram />
            </a>
          </div>
        </nav>
        <div className="cover"></div>
      </div>
    </div>
  );
};

export default Sidebar;
