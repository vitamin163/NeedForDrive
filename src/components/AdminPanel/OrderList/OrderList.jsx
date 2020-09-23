import React, { useEffect } from 'react';
import { actions } from '@/store';
import getData from '@/store/fetchData';
import { getInterval, getTokens } from '@/utils';
import './OrderList.scss';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '@/components/Spinner';
import Order from './Order/Order.jsx';
import Pagination from '../Pagination';

const GetPage = () => {
  const { currentOrdersPage } = useSelector((state) => state.admin);
  const { submitForm } = useFormikContext();
  useEffect(() => {
    submitForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrdersPage]);
  return null;
};

const OrderList = (props) => {
  const { proxy, api, headers } = props;
  const dispatch = useDispatch();
  const { cars, isCarsLoaded } = useSelector((state) => state.cars);
  const { cities, isCitiesLoaded } = useSelector((state) => state.cities);
  const { statuses, isOrderStatusLoaded } = useSelector((state) => state.orderStatus);
  const { requestState } = useSelector((state) => state.asyncRequestState);
  const {
    orders,
    currentOrdersPage,
    totalOrdersPage,
    orderPageSize,

    intervals,
  } = useSelector((state) => state.admin);
  const {
    addCities,
    addOrders,
    addPoints,

    addCars,
    addOrderStatus,
    setIntervals,
    setCurrentOrdersPage,
    addRates,
  } = actions;

  const fetchData = [
    {
      url: `${proxy}${api}db/car/`,
      action: addCars,
    },
    {
      url: `${proxy}${api}db/city/`,
      action: addCities,
    },
    {
      url: `${proxy}${api}db/point/`,
      action: addPoints,
    },
    {
      url: `${proxy}${api}db/orderStatus/`,
      action: addOrderStatus,
    },
    {
      url: `${proxy}${api}db/rate/`,
      action: addRates,
    },
  ];

  useEffect(() => {
    const { accessToken } = getTokens();
    if (!isCarsLoaded && !isCitiesLoaded && !isOrderStatusLoaded) {
      console.log('getData');
      dispatch(
        getData(fetchData, {
          ...headers,
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
          Authorization: `Bearer ${accessToken}`,
        }),
      );
    }
    dispatch(setIntervals(getInterval()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSelect = (items, isStatuses) => {
    const key = isStatuses ? 'translation' : 'name';
    return items.map((item) => {
      const { id } = item;
      const name = item[key];
      return (
        <option key={id} value={id} className="">
          {name}
        </option>
      );
    });
  };

  const submitHandler = async ({ byInterval, byModel, byCity, byStatus }) => {
    const { accessToken } = getTokens();
    const queryByModel = byModel ? `carId[id]=${byModel}` : byModel;
    const queryByInterval = `createdAt[$gt]=${byInterval}`;
    const queryByCity = byCity ? `cityId[id]=${byCity}` : byCity;
    const queryByOrderStatus = byStatus ? `orderStatusId[id]=${byStatus}` : byStatus;
    const paginate = `page=${currentOrdersPage}&limit=${orderPageSize}`;
    const urlParts = `${proxy}${api}db/order?`;
    const queryParts = [queryByInterval, queryByModel, queryByCity, queryByOrderStatus, paginate]
      .filter((item) => item !== '')
      .join('&');
    const url = `${urlParts}${queryParts}`;
    console.log(url);
    dispatch(
      getData(
        [
          {
            url,
            action: addOrders,
          },
        ],
        {
          ...headers,
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
          Authorization: `Bearer ${accessToken}`,
        },
      ),
    );
  };

  const renderOrders = () => {
    return orders.map((order, i) => (
      <React.Fragment key={order.id}>
        <Order proxy={proxy} api={api} order={i} />
        {i !== orders.length - 1 && <hr className="orderList__hr" />}
      </React.Fragment>
    ));
  };
  const handlePageClick = async (e) => {
    const selectedPage = e.selected;
    dispatch(setCurrentOrdersPage(selectedPage));
  };
  return (
    <div className="orderList">
      <div className="orderList__sub-header">Заказы</div>
      <div className="orderList__container">
        <div className="orderList__topbar">
          <Formik
            initialValues={{
              byModel: '',
              byInterval: 0,
              byCity: '',
              byStatus: '',
            }}
            onSubmit={submitHandler}
          >
            {({ isSubmitting }) => (
              <Form className="orderList__form">
                <div className="orderList__button-container">
                  <Field name="byInterval" as="select" className="orderList__filterButton">
                    <option value={0}>За всё время</option>
                    {renderSelect(intervals)}
                  </Field>
                  <Field name="byModel" as="select" className="orderList__filterButton">
                    <option value="">Все модели</option>
                    {renderSelect(cars)}
                  </Field>
                  <Field name="byCity" as="select" className="orderList__filterButton">
                    <option value="">Все города</option>
                    {renderSelect(cities)}
                  </Field>
                  <Field name="byStatus" as="select" className="orderList__filterButton">
                    <option value="">Все заказы</option>
                    {renderSelect(statuses, true)}
                  </Field>
                </div>
                <button type="submit" disabled={isSubmitting} className="orderList__applyButton">
                  Применить
                </button>
                <GetPage />
              </Form>
            )}
          </Formik>
        </div>
        {requestState === 'SUCCESS' && <div className="orderList__content">{renderOrders()}</div>}
        {requestState === 'REQUEST' && <Spinner />}
        <div className="orderList__footer">
          <Pagination totalPage={totalOrdersPage} action={handlePageClick} />
        </div>
      </div>
    </div>
  );
};
export default OrderList;
