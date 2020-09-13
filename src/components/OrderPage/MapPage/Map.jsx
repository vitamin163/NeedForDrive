import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appendScript } from '@/utils';
import { actions } from '@/store';
import { mapPoint } from '@/icon';

const apiKey = process.env.REACT_APP_API_KEY;
const yaMapsApi = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;

const Map = () => {
  const [map, setMap] = useState({});
  const dispatch = useDispatch();
  const { cityId, pointId } = useSelector((state) => state.order);
  const { isYMapsCreated, isYMapsLoaded, defaultCoords } = useSelector((state) => state.map);

  const {
    setLoadState,
    setStateMapCreated,
    setDefaultCoords,
    filterPoint,
    addPointInputValue,
    addPointId,
    addCityId,
    filterCity,
    addCityInputValue,
    deletePointId,
  } = actions;
  const currentCity = cityId.id ? cityId.name : 'Ульяновск';

  const { cities } = useSelector((state) => state.cities);
  const { points } = useSelector((state) => state.points);
  const currentPointId = pointId.id;

  const getCoords = async (place) => {
    const res = await window.ymaps.geocode(place);
    const firstGeoObject = res.geoObjects.get(0);
    const coords = firstGeoObject.geometry.getCoordinates();
    return coords;
  };

  const getPoints = (ymap) => {
    points.map(async (item) => {
      console.log('getPoints');
      const coords = await getCoords(`${item.cityId.name} ${item.address}`);
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
        dispatch(addCityId(item.cityId));
        dispatch(filterCity(''));
        dispatch(addCityInputValue(item.cityId.name));
        dispatch(addPointId(item));
        dispatch(filterPoint(''));
        return dispatch(addPointInputValue(item.address));
      });
      ymap.geoObjects.add(myPlacemark);
    });
  };

  const getCities = (ymap) => {
    cities.map(async (item) => {
      const coords = await getCoords(item.name);
      const myPlacemark = new window.ymaps.Placemark(
        coords,
        {
          hintContent: item.name,
        },
        {
          preset: 'islands#darkGreenStretchyIcon',
        },
      );
      myPlacemark.events.add('click', () => {
        ymap.setCenter(coords, 10, {
          duration: 500,
        });

        dispatch(addCityId(item));
        dispatch(filterCity(''));
        dispatch(deletePointId());
        return dispatch(addCityInputValue(item.name));
      });
      ymap.geoObjects.add(myPlacemark);
    });
  };

  const createNewMap = async () => {
    if (!isYMapsLoaded) return false;
    const init = () => {
      const myMap = new window.ymaps.Map(
        'YMapsID',
        {
          center: defaultCoords,
          zoom: 5,
        },
        {
          searchControlProvider: 'yandex#search',
        },
      );
      getCities(myMap);
      getPoints(myMap);
      setMap(myMap);
    };
    await window.ymaps.ready(init);
    return dispatch(setStateMapCreated(true));
  };

  const findCity = async () => {
    if (!isYMapsCreated) return false;
    const coords = await getCoords(currentCity);
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
    getCoords(`${pointId.cityId.name} ${pointId.address}`).then((coords) => {
      map.setCenter(coords, 12, {
        duration: 500,
      });
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
