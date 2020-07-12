import React from 'react';
import './Sidebar.scss';

const Sidebar = () => (
  <div className="sidebar">
    <button className="sidebar__burger-btn" alt='menu button'>
      <svg className="sidebar__burger-image" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 16H28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 8H28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 24H28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
    <button className="sidebar__lang-btn" alt="language button">Eng</button>
  </div>
);

export default Sidebar;
