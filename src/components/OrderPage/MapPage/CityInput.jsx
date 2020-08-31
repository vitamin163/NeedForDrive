import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { capitalize } from 'lodash';
import { actions } from '../../../store';
import './MapPage.scss';
import Input from '../../Input/Input.jsx';

const CityInput = () => {
  const dispatch = useDispatch();
  const {
    cities: { cities },
  } = useSelector((state) => state);

  const { cityFilterValue, cityInputValue } = useSelector((state) => state.locationsInput);

  const { filterCity, addCityInputValue, addCityId, deleteCityId, deletePointId } = actions;

  const addCityHandler = (city) => {
    dispatch(addCityId(city));
    dispatch(filterCity(''));
    dispatch(addCityInputValue(city.name));
    dispatch(deletePointId());
  };

  const filtered = cities.filter(
    ({ name }) => name.toUpperCase().indexOf(cityFilterValue.toUpperCase()) >= 0,
  );
  useEffect(() => {
    if (filtered.length === 1 && filtered[0].name === capitalize(cityFilterValue)) {
      const city = filtered[0];
      addCityHandler(city);
    }
  });

  const renderCity = () => {
    return filtered.map((city) => {
      return (
        <button key={city.id} onClick={() => addCityHandler(city)}>
          {city.name}
        </button>
      );
    });
  };

  const handleChangeCity = ({ target: { value } }) => {
    dispatch(filterCity(value));
    dispatch(addCityInputValue(value));
  };

  return (
    <Input
      label="Город"
      type="text"
      value={cityInputValue}
      change={handleChangeCity}
      click={() => dispatch(deleteCityId())}
      placeholder="Начните вводить город..."
      dropdown={
        cityFilterValue.length > 0 && <div className="map-page__dropdown">{renderCity()}</div>
      }
    />
  );
};
export default CityInput;
