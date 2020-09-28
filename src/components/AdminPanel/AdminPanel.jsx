import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import { actions } from '@/store';
import { destroyTokens } from '@/utils';
import './AdminPanel.scss';
import Authorization from './Authorization';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import OrderList from './OrderList';
import CarList from './CarList';
import ErrorPage from './ErrorPage';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.uiState);
  const { requestState, error } = useSelector((state) => state.asyncRequestState);
  const { setAuth, setRequestState, setError } = actions;
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const api = 'http://api-factory.simbirsoft1.com/api/';
  const headers = {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    'Content-Type': 'application/json',
  };

  const logout = async (token, idTimeout) => {
    dispatch(setRequestState('REQUEST'));
    try {
      await axios({
        method: 'post',
        url: `${proxy}${api}auth/logout`,
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      });
      destroyTokens();
      dispatch(setAuth(false));
      clearTimeout(idTimeout);
      dispatch(setRequestState('SUCCESS'));
    } catch (e) {
      console.log(error);
      dispatch(setRequestState('FAILURE'));
      dispatch(setError(e.message));
    }
  };

  return (
    <div className="admin-panel">
      <Switch>
        <Route path="/admin/login">
          <Authorization proxy={proxy} api={api} headers={headers} />
        </Route>
        {!isAuth && <Redirect to="/admin/login" />}

        <Route path="/admin">
          <Sidebar />
          <div className="admin-panel__column">
            <Topbar logout={logout} />
            {requestState === 'FAILURE' && <Redirect to="/admin/error" />}
            <Route path="/admin/error">
              <ErrorPage proxy={proxy} api={api} headers={headers} errorCode={error} />
            </Route>
            <Route path="/admin/orderList">
              <OrderList proxy={proxy} api={api} headers={headers} />
            </Route>
            <Route path="/admin/carList">
              <CarList proxy={proxy} api={api} headers={headers} />
            </Route>
            <Footer />
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default AdminPanel;
