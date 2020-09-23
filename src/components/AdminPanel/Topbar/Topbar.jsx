import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTokens } from '@/utils';
import { actions } from '../../../store';
import './Topbar.scss';
import { search, arrowToDown, notifications, count } from '../../../icon';
import avatar from '../../../img/user-avatar.png';

const Topbar = ({ logout }) => {
  const dispatch = useDispatch();
  const { dropdownIsOpen } = useSelector((state) => state.uiState);
  const { idTimeout } = useSelector((state) => state.admin);
  const { toggleDropdown } = actions;

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
        <div className="topbar__dropdown">
          <button className="topbar__menu" onClick={() => dispatch(toggleDropdown())}>
            <img className="topbar__avatar" src={avatar} alt="avatar" />
            <span className="topbar__admin-name">Admin</span>
            <img className="topbar__arrowToDown" src={arrowToDown} alt="arrow" />
          </button>
          {dropdownIsOpen && (
            <div className="topbar__dropdown-content">
              <button
                className="topbar__dropdown-item"
                onClick={() => {
                  const { accessToken } = getTokens();
                  logout(accessToken, idTimeout);
                }}
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
