import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './Authorization.scss';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { logo } from '@/icon';
import { actions } from '@/store';
import { setTokens, getRandomString, getTokens } from '@/utils';

const validationSchema = Yup.object({
  password: Yup.string().required('Password is required'),
});

const Authorization = (props) => {
  const { proxy, api, headers } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { setAuth, setRequestState, setIdTimeout } = actions;

  const makeAxios = (reqInterceptor, resInterceptor) => {
    const instance = axios.create();
    reqInterceptor(instance);
    resInterceptor(instance);
    return instance;
  };

  const requestInterceptor = (instance) => {
    const { accessToken } = getTokens();
    console.log('reqInterceptor');
    const interceptor = instance.interceptors.request.use(
      (config) => {
        dispatch(setRequestState('REQUEST'));
        if (!accessToken) {
          dispatch(setRequestState('SUCCESS'));
          instance.interceptors.response.eject(interceptor);
          return new Promise(() => {});
        }
        instance.interceptors.response.eject(interceptor);
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
        instance.interceptors.response.eject(interceptor);
      },
    );
  };

  let isRefreshing = false;

  const responseInterceptor = (instance) => {
    const interceptor = instance.interceptors.response.use(
      (response) => {
        const { expiresDate } = getTokens();
        const timeout = expiresDate - Date.now();
        console.log(timeout);
        const retryCheck = makeAxios(requestInterceptor, responseInterceptor);
        dispatch(setRequestState('SUCCESS'));
        dispatch(setAuth(true));
        const idTimeout = setTimeout(() => retryCheck(response.config), timeout);
        dispatch(setIdTimeout(idTimeout));
        history.push('/admin/');
        instance.interceptors.response.eject(interceptor);
        return response;
      },
      (error) => {
        if (error.response.status !== 401) {
          instance.interceptors.response.eject(interceptor);
          return Promise.reject(error);
        }
        if (error.response.status === 401 && !isRefreshing) {
          const { refreshToken, basicToken } = getTokens();
          const getRefreshToken = axios.create();
          return getRefreshToken({
            method: 'post',
            url: `${proxy}${api}auth/refresh`,
            headers: {
              ...headers,
              Authorization: `Basic ${basicToken}`,
            },
            data: JSON.stringify({ refresh_token: refreshToken }),
          })
            .then(({ data }) => {
              setTokens(data, basicToken);
              isRefreshing = true;
              const chechAuth = makeAxios(requestInterceptor, responseInterceptor);
              return chechAuth.get(error.config);
            })
            .catch((e) => {
              Promise.reject(e);
            })
            .finally(() => instance.interceptors.response.eject(interceptor));
        }
        instance.interceptors.response.eject(interceptor);
        return Promise.reject(error);
      },
    );
  };

  const submitHandler = async ({ email, password }, action) => {
    const authData = {
      username: email,
      password,
    };
    const randomString = getRandomString();
    const basicToken = window.btoa(`${randomString}:4cbcea96de`);
    try {
      const { data } = await axios({
        method: 'post',
        url: `${proxy}${api}auth/login`,
        headers: {
          ...headers,
          Authorization: `Basic ${basicToken}`,
        },
        data: JSON.stringify(authData),
      });
      setTokens(data, basicToken);
      const checkAuth = makeAxios(requestInterceptor, responseInterceptor);
      setTimeout(() => checkAuth.get(`${proxy}${api}auth/check`), data.expires_in * 1000);
      dispatch(setAuth(true));
      history.push('/admin/');
    } catch (e) {
      action.setErrors({ email: e.message });
    }
  };

  useEffect(() => {
    const checkAuth = makeAxios(requestInterceptor, responseInterceptor);
    checkAuth.get(`${proxy}${api}auth/check`);

    return () => {
      dispatch(setRequestState(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="admin-panel__authorization authorization">
      <div className="authorization__label-container">
        <img className="authorization__logo" src={logo} alt="logo" />
        <h2 className="authorization__label">Need for drive</h2>
      </div>
      <div className="authorization__auth-block">
        <h3 className="authorization__name">Вход</h3>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form className="authorization__form">
              <div className="authorization__input-name">
                Почта
                {isSubmitting && <div className="authorization__loading">...Loading</div>}
              </div>
              <Field name="email">{({ field }) => <input type="text" {...field} />}</Field>
              <ErrorMessage name="email">
                {(msg) => <div className="authorization__error">{msg}</div>}
              </ErrorMessage>
              <div className="authorization__input-name">Пароль</div>
              <Field name="password">{({ field }) => <input type="password" {...field} />}</Field>

              <ErrorMessage name="password">
                {(msg) => <div className="authorization__error">{msg}</div>}
              </ErrorMessage>
              <div className="authorization__button-container">
                <button className="authorization__auth-link" disabled={isSubmitting}>
                  Запросить доступ
                </button>
                <button
                  className="authorization__submit-button"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Войти
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Authorization;
