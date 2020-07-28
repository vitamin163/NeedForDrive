import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import { actions } from '../../../store';
import './MapPage.scss';
import map from '../../../img/map.jpg';
import Order from '../Order/Order.jsx';
import CityInput from './CityInput.jsx';
import Pointinput from './PointInput.jsx';

const MapPage = () => {
  const dispatch = useDispatch();
  const { pointId } = useSelector((state) => state.order);

  const { addCities, addPoints } = actions;

  useEffect(() => {
    const getLocations = async () => {
      try {
        const {
          data: { data: dataCities },
        } = await axios.get('http://api-factory.simbirsoft1.com/api/db/city/', {
          headers: {
            'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
            Authorization: 'Bearer 4cbcea96de',
          },
        });
        const {
          data: { data: dataPoints },
        } = await axios.get('http://api-factory.simbirsoft1.com/api/db/point/', {
          headers: {
            'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
            Authorization: 'Bearer 4cbcea96de',
          },
        });
        dispatch(addCities(dataCities));
        dispatch(addPoints(dataPoints));
      } catch (e) {
        console.log(e);
      }
    };

    getLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buttonClass = cn({
    order__button: true,
    order__button_disabled: !pointId.id,
  });

  return (
    <>
      <div className="order-page__map-page map-page">
        <div className="map-page__search-container">
          <CityInput />
          <Pointinput />
        </div>
        <div className="map-page__map">
          <span>Выбрать на карте</span>
          <img className="map-page__map-image" src={map} alt="map" />
        </div>
      </div>
      <Order buttonName="Выбрать модель" buttonClass={buttonClass} activeLink={1} />
    </>
  );
};
export default MapPage;
