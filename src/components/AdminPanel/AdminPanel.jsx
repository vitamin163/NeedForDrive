import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.scss';
import Authorization from './Authorization/Authorization.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import Topbar from './Topbar/Topbar.jsx';
import Footer from './Footer/Footer.jsx';
import OrderList from './OrderList/OrderList.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import { actions } from '../../store';

const AdminPanel = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const { requestState } = useSelector((state) => state.asyncRequestState);
  const { isAuth } = useSelector((state) => state.uiState);
  const { setRequestState, setAuth } = actions;

  const headers = {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    'Content-Type': 'application/json',
  };

  const logout = async () => {
    try {
      await axios({
        method: 'post',
        url:
          'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/auth/logout',
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('basicToken');
      dispatch(setAuth(false));
    } catch (error) {
      console.log(error);
    }
  };

  const autoLogin = async () => {
    const basicToken = localStorage.getItem('basicToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken) {
      return false;
    }
    dispatch(setRequestState('REQUEST'));
    return axios
      .get(
        'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/auth/check/',
        {
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(() => {
        dispatch(setAuth(true));
        dispatch(setRequestState('SUCCESS'));
        history.push('/admin/');
      })
      .catch(() => {
        axios({
          method: 'post',
          url:
            'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/auth/refresh',
          headers: {
            ...headers,
            Authorization: `Basic ${basicToken}`,
          },
          data: JSON.stringify({ refresh_token: refreshToken }),
        })
          .then(({ data }) => {
            localStorage.setItem('accessToken', data.access_token);
            localStorage.setItem('refreshToken', data.refresh_token);
            dispatch(setAuth(true));
            dispatch(setRequestState('SUCCESS'));
            history.push('/admin/');
          })
          .catch((error) => {
            console.log(error);
            logout();
            dispatch(setRequestState('FAILURE'));
          });
      });
  };
  useEffect(() => {
    autoLogin();
    return () => {
      dispatch(setRequestState(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {requestState === 'REQUEST' && <Spinner />}
      {requestState !== 'REQUEST' && (
        <div className="admin-panel">
          <Switch>
            <Route path="/admin/login" component={Authorization} />
            {!isAuth && <Redirect to="/admin/login" />}
            <Route path="/admin">
              <Sidebar />
              <div className="admin-panel__column">
                <Topbar logout={logout} />
                <Route path="/admin/orderList" component={OrderList} />
                <Footer />
              </div>
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
