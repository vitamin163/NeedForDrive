import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './AdminPanel.scss';
import Authorization from './Authorization/Authorization.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import Topbar from './Topbar/Topbar.jsx';
import Footer from './Footer/Footer.jsx';
import OrderList from './OrderList/OrderList.jsx';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <Switch>
        <Route path="/admin/authorization" component={Authorization} />
        {/* <Redirect from="/admin" to="/admin/authorization" /> */}
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
