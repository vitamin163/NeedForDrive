import React, { useEffect, useRef } from 'react';
import { actions } from '@/store';
import getData from '@/store/fetchData';
import { getInterval, getTokens } from '@/utils';
import './OrderList.scss';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Common/Spinner';
import Order from './Order/Order.jsx';
import Pagination from '../Common/Pagination';
import Filter from '../Common/Filter';
import FilterButton from '../Common/FilterButton';

const OrderList = ({ proxy, api, headers }) => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.cars);
  const { cities } = useSelector((state) => state.cities);
  const { statuses } = useSelector((state) => state.orderStatus);
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
    setCurrentPage,
    addRates,
    setRatesLoaded,
    setOrderStatusLoaded,
    setPointsLoaded,
    setCitiesLoaded,
    setCarsLoaded,
  } = actions;

  const fetchData = [
    {
      url: `${proxy}${api}db/order?page=${currentOrdersPage}&limit=${orderPageSize}`,
      action: addOrders,
    },
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

  const didMountRef = useRef(false);
  useEffect(() => {
    const { accessToken } = getTokens();

    if (!didMountRef.current) {
      console.log('getData');
      dispatch(
        getData(fetchData, {
          ...headers,
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
          Authorization: `Bearer ${accessToken}`,
        }),
      );
      dispatch(setIntervals(getInterval()));
    } else {
      didMountRef.current = true;
    }
    return () => {
      dispatch(setRatesLoaded(false));
      dispatch(setOrderStatusLoaded(false));
      dispatch(setPointsLoaded(false));
      dispatch(setCitiesLoaded(false));
      dispatch(setCarsLoaded(false));
    };
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
    dispatch(setCurrentPage({ page: selectedPage, name: 'currentOrdersPage' }));
  };
  return (
    <div className="orderList">
      <div className="orderList__sub-header">Заказы</div>
      <div className="orderList__container">
        <div className="orderList__topbar">
          <Filter
            initialValues={{
              byModel: '',
              byInterval: 0,
              byCity: '',
              byStatus: '',
            }}
            onSubmit={submitHandler}
          >
            <FilterButton name="byInterval" as="select" render={() => renderSelect(intervals)}>
              <option value={0}>За всё время</option>
            </FilterButton>
            <FilterButton name="byModel" as="select" render={() => renderSelect(cars)}>
              <option value="">Все модели</option>
            </FilterButton>
            <FilterButton name="byCity" as="select" render={() => renderSelect(cities)}>
              <option value="">Все города</option>
            </FilterButton>

            <FilterButton name="byStatus" as="select" render={() => renderSelect(statuses, true)}>
              <option value="">Все заказы</option>
            </FilterButton>
          </Filter>
        </div>
        {requestState === 'SUCCESS' && <div className="orderList__content">{renderOrders()}</div>}
        {requestState === 'REQUEST' && <Spinner />}
        <div className="orderList__footer">
          <Pagination
            totalPage={totalOrdersPage}
            action={handlePageClick}
            currentPage={currentOrdersPage}
          />
        </div>
      </div>
    </div>
  );
};
export default OrderList;
