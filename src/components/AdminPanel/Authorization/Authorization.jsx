import React from 'react';
import './Authorization.scss';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { logo } from '../../../icon';
import { autoLogout } from '../../../utils';

const validationSchema = Yup.object({
  password: Yup.string().required('Password is required'),
});

const Authorization = () => {
  const history = useHistory();
  const submitHandler = async ({ email, password }, actions) => {
    const authData = {
      username: email,
      password,
    };
    try {
      const response = await axios({
        method: 'post',
        url:
          'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/auth/login',
        headers: {
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
          Authorization: 'Basic dml0YW1pbjo0Y2JjZWE5NmRl',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(authData),
      });
      const { access_token: accessToken, user_id: userId, expires_in: expiresIn } = response.data;
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expirationDate', expirationDate);
      autoLogout(expiresIn);
      history.push('/admin/');
    } catch (e) {
      actions.setErrors({ email: e.message });
    }
  };

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
