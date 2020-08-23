import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { actions } from '../../../store';
import './MapPage.scss';
import Order from '../Order/Order.jsx';
import CityInput from './CityInput.jsx';
import Pointinput from './PointInput.jsx';
import Map from './Map.jsx';
import Spinner from '../../Spinner/Spinner.jsx';
import Error from '../../Error/Error.jsx';

const MapPage = () => {
  const dispatch = useDispatch();
  const { pointId } = useSelector((state) => state.order);
  const { addCities, addPoints, changeActiveNav, setRequestState } = actions;
  const { isCitiesLoaded } = useSelector((state) => state.cities);
  const { isPointsLoaded } = useSelector((state) => state.points);
  const { requestState } = useSelector((state) => state.asyncRequestState);

  useEffect(() => {
    if (isCitiesLoaded && isPointsLoaded) {
      dispatch(setRequestState('SUCCESS'));
    }
    const getData = async () => {
      dispatch(setRequestState('REQUEST'));
      try {
        const {
          data: { data: dataCities },
        } = await axios.get(
          'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/city/',
          {
            headers: {
              'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
              Authorization: 'Bearer 4cbcea96de',
            },
          },
        );
        const {
          data: { data: dataPoints },
        } = await axios.get(
          'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/point/',
          {
            headers: {
              'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
              Authorization: 'Bearer 4cbcea96de',
            },
          },
        );
        dispatch(addCities(dataCities));
        dispatch(addPoints(dataPoints));
        dispatch(setRequestState('SUCCESS'));
      } catch (error) {
        console.log(error);
        dispatch(setRequestState('FAILURE'));
      }
    };
    if (!isCitiesLoaded && !isPointsLoaded) {
      getData();
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
