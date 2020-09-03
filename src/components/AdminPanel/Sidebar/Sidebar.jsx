import React from 'react';
import './Sidebar.scss';
import { NavLink } from 'react-router-dom';

import {
  logo,
  AddNewPostIcon,
  BlogIcon,
  BlogPostsIcon,
  ErrorIcon,
  FormsAndComponentsIcon,
  OverviewIcon,
  PersonIcon,
} from '../../../icon';

const Sidebar = () => {
  const links = [
    { name: 'Карточка автомобиля', icon: BlogIcon, path: '/admin/carSetting' },
    { name: 'Список авто', icon: BlogPostsIcon, path: '/admin/table' },
    { name: 'Заказы', icon: AddNewPostIcon, path: '/admin/orderList' },
    { name: 'Menu 4', icon: OverviewIcon, path: 'admin/menu4' },
    { name: 'Menu 5', icon: FormsAndComponentsIcon, path: 'admin/menu5' },
    { name: 'Menu 6', icon: PersonIcon, path: 'admin/menu6' },
    { name: 'Menu 7', icon: ErrorIcon, path: 'admin/menu7' },
  ];

  const renderLinks = () => {
    return links.map((link) => {
      return (
        <li key={link.name}>
          <NavLink
            className="admin-sidebar__link"
            activeClassName="admin-sidebar__link_active"
            to={link.path}
          >
            <link.icon />
            <span>{link.name}</span>
          </NavLink>
        </li>
      );
    });
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar__label-container">
        <img className="admin-sidebar__logo" src={logo} alt="logo" />
        <h2 className="admin-sidebar__label">Need for drive</h2>
      </div>
      <ul className="admin-sidebar__links">{renderLinks()}</ul>
    </div>
  );
};

export default Sidebar;
