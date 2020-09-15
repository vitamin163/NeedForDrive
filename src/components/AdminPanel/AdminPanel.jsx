import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { actions } from '@/store';
import './AdminPanel.scss';
import Authorization from './Authorization';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import OrderList from './OrderList';
import Spinner from '../Spinner';

const axiosApiInstance = axios.create();

const AdminPanel = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const { requestState } = useSelector((state) => state.asyncRequestState);
  const { isAuth } = useSelector((state) => state.uiState);
  const { setRequestState, setAuth } = actions;
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const api = 'http://api-factory.simbirsoft1.com/api/';
  const headers = {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    'Content-Type': 'application/json',
  };

  const logout = async () => {
    try {
      await axios({
        method: 'post',
        url: `${proxy}${api}auth/logout`,
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

  const requestInterceptor = () => {
    axios.interceptors.request.use(
      (config) => {
        dispatch(setRequestState('REQUEST'));
        if (!accessToken) {
          dispatch(setRequestState('SUCCESS'));
          return new Promise(() => {});
        }
        return {
          ...config,
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      (error) => {
        Promise.reject(error);
      },
    );
  };

  const responseInterceptor = () => {
    axios.interceptors.response.use(
      (response) => {
        dispatch(setRequestState('SUCCESS'));
        dispatch(setAuth(true));
        history.push('/admin/');
        return response;
      },
      (error) => {
        const originalRequest = error.config;
        console.log(error.response);
        if (error.response.status === 401 && !originalRequest.retry) {
          originalRequest.retry = true;
          const refreshToken = localStorage.getItem('refreshToken');
          const basicToken = localStorage.getItem('basicToken');
          return axiosApiInstance({
            method: 'post',
            url: `${proxy}${api}auth/refresh`,
            headers: {
              ...headers,
              Authorization: `Basic ${basicToken}`,
            },
            data: JSON.stringify({ refresh_token: refreshToken }),
          }).then((res) => {
            console.log(res);
            if (res.status === 200) {
              console.log('200!!!');
              localStorage.setItem('accessToken', res.data.access_token);
              localStorage.setItem('refreshToken', res.data.refresh_token);
              dispatch(setAuth(true));
              history.push('/admin/');
              // axios.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;
              // return axios(originalRequest);
            }
          });
        }
        console.log('failResponse');
        dispatch(setRequestState('FAILURE'));
        return Promise.reject(error);
      },
    );
  };

  useEffect(() => {
    requestInterceptor();
    responseInterceptor();
    axios.get(`${proxy}${api}auth/check`);
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
