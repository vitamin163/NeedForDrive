import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Authorization from './Authorization/Authorization.jsx';
import './AdminPanel.scss';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <Switch>
        <Route path="/admin/authorization" component={Authorization} />
        <Redirect from="/admin" to="/admin/authorization" />
      </Switch>
    </div>
  );
};

export default AdminPanel;
