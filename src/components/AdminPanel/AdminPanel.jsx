import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './AdminPanel.scss';
import Authorization from './Authorization/Authorization.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import Topbar from './Topbar/Topbar.jsx';
import Footer from './Footer/Footer.jsx';
import OrderList from './OrderList/OrderList.jsx';
import { logout, autoLogout } from '../../utils';

const autoLogin = () => {
  const token = localStorage.getItem('token');
  const expirationDate = new Date(localStorage.getItem('expirationDate'));
  if (expirationDate <= new Date() || !token) {
    logout();
  } else {
    autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000);
  }
};

const AdminPanel = () => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <div className="admin-panel">
      <Switch>
        <Route path="/admin/login" component={Authorization} />
        {!token && <Redirect to="/admin/login" />}
        <Route path="/admin/">
          <Sidebar />
          <div className="admin-panel__column">
            <Topbar />
            <Route path="/admin/orderList" component={OrderList} />
            <Footer />
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default AdminPanel;
