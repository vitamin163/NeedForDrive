import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '@/store';
import Spinner from '@Components/Spinner';
import Error from '@Components/Error';
import getData from '@/store/fetchData';
import './MapPage.scss';
import Order from '../Order';
import CityInput from './CityInput.jsx';
import Pointinput from './PointInput.jsx';
import Map from './Map.jsx';

const MapPage = (props) => {
  const { proxy, api, headers } = props;
  const dispatch = useDispatch();
  const { pointId } = useSelector((state) => state.order);
  const { addCities, addPoints, changeActiveNav, setRequestState } = actions;
  const { isCitiesLoaded } = useSelector((state) => state.cities);
  const { isPointsLoaded } = useSelector((state) => state.points);
  const { requestState } = useSelector((state) => state.asyncRequestState);
  const fetchData = [
    {
      url: `${proxy}${api}city/`,
      action: addCities,
    },
    {
      url: `${proxy}${api}point/`,
      action: addPoints,
    },
  ];
  useEffect(() => {
    if (isCitiesLoaded && isPointsLoaded) {
      dispatch(setRequestState('SUCCESS'));
    }
    if (!isCitiesLoaded && !isPointsLoaded) {
      dispatch(getData(fetchData, headers));
    }
    return () => {
      dispatch(setRequestState(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {requestState === 'REQUEST' && <Spinner />}
      {requestState === 'SUCCESS' && (
        <div className="order-page__map-page map-page">
          <div className="map-page__search-container">
            <CityInput />
            <Pointinput />
          </div>
          <div className="map-page__map-container">
            <span>Выбрать на карте</span>
            <Map />
          </div>
        </div>
      )}
      {requestState === 'FAILURE' && <Error text="Не удалось получить данные" />}
      <Order
        buttonName="Выбрать модель"
        disabled={!pointId.id}
        click={() => dispatch(changeActiveNav(1))}
      />
    </>
  );
};
export default MapPage;
