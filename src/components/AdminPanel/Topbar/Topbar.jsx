import React from 'react';
import './Topbar.scss';
import { search, arrowToDown, notifications, count } from '../../../icon';
import avatar from '../../../img/user-avatar.png';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar__search">
        <img src={search} alt="search" />
        <form>
          <input placeholder="Поиск..." />
        </form>
      </div>
      <div className="topbar__control-panel">
        <button className="topbar__notifications">
          <img src={notifications} alt="notifications" className="topbar__notifications-icon" />
          <img src={count} alt="count" className="topbar__count" />
        </button>
        <button className="topbar__menu">
          <img className="topbar__avatar" src={avatar} alt="avatar" />
          <span className="topbar__admin-name">Admin</span>
          <img className="topbar__arrowToDown" src={arrowToDown} alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
