import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appendScript } from '../../../utils';
import { actions } from '../../../store';
import { mapPoint } from '../../../icon';

const apiKey = process.env.REACT_APP_API_KEY;
const yaMapsApi = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;

const Map = () => {
  const [map, setMap] = useState({});
  const dispatch = useDispatch();
  const { cityId, pointId } = useSelector((state) => state.order);
  const { isYMapsCreated, isYMapsLoaded, defaultCoords, points: coordpoint } = useSelector(
    (state) => state.map,
  );

  const {
    setLoadState,
    setStateMapCreated,
    setPoints,
    setDefaultCoords,
    filterPoint,
    addPointInputValue,
    addPointId,
  } = actions;
  const currentCity = cityId.id ? cityId.name : 'Ульяновск';

  const { points } = useSelector((state) => state.points);
  const currentPointId = pointId.id;

  const getPoints = async (ymap) => {
    const addresses = await points.reduce(async (acc, item) => {
      if (currentCity === item.cityId.name) {
        const res = await window.ymaps.geocode(`${item.cityId.name} ${item.address}`);
        const firstGeoObject = res.geoObjects.get(0);
        const coords = firstGeoObject.geometry.getCoordinates();
        const myPlacemark = new window.ymaps.Placemark(
          coords,
          {
            hintContent: item.name,
            balloonContent: `${item.cityId.name}, ${item.address}`,
          },
          {
            iconLayout: 'default#image',
            iconImageHref: mapPoint,
            iconImageSize: [18, 18],
            iconImageOffset: [-9, -9],
          },
        );
        myPlacemark.events.add('click', () => {
          ymap.setCenter(coords, 12, {
            duration: 500,
          });
          if (!cityId.id) {
            return false;
          }
          dispatch(addPointId(item));
          dispatch(filterPoint(''));
          return dispatch(addPointInputValue(item.address));
        });
        ymap.geoObjects.add(myPlacemark);
        const newItem = { ...item, coords };
        const newAcc = await acc;
        return [...newAcc, newItem];
      }
      return acc;
    }, []);
    dispatch(setPoints(addresses));
  };

  const createNewMap = async () => {
    if (!isYMapsLoaded) return false;
    const init = () => {
      const myMap = new window.ymaps.Map(
        'YMapsID',
        {
          center: defaultCoords,
          zoom: 10,
        },
        {
          searchControlProvider: 'yandex#search',
        },
      );
      getPoints(myMap);
      setMap(myMap);
    };
    await window.ymaps.ready(init);
    return dispatch(setStateMapCreated(true));
  };

  const findCity = async () => {
    if (!isYMapsCreated) return false;
    getPoints(map);
    const res = await window.ymaps.geocode(currentCity);
    const firstGeoObject = res.geoObjects.get(0);
    const coords = firstGeoObject.geometry.getCoordinates();
    map.setCenter(coords, 10);
    return dispatch(setDefaultCoords(coords));
  };

  useEffect(() => {
    appendScript(yaMapsApi, isYMapsLoaded, () => dispatch(setLoadState(true)));
    createNewMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isYMapsLoaded]);

  useEffect(() => {
    if (!currentPointId || !isYMapsCreated) return;
    const { coords } = coordpoint.filter((point) => point.id === currentPointId)[0];
    map.setCenter(coords, 12, {
      duration: 500,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPointId]);

  useEffect(() => {
    findCity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId.id]);

  useEffect(() => {
    return () => {
      dispatch(setStateMapCreated(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div id="YMapsID" className="map-page__map" />;
};
export default Map;
