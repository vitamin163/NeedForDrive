import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { capitalize } from 'lodash';
import { actions } from '../../../slices';
import './MapPage.scss';
import icons from '../../../JS/icons';

const CityInput = () => {
  const dispatch = useDispatch();

  const locations = useSelector((state) => state.locations);

  const { cityFilterValue, cityInputValue } = useSelector((state) => state.locationsInput);

  const { filterCity, addCityInputValue, addCityId, deleteCityId, deletePointId } = actions;

  const { cleanInput } = icons;

  const addCityHandler = (id, name) => {
    dispatch(addCityId(id));
    dispatch(filterCity(''));
    dispatch(addCityInputValue(name));
    dispatch(deletePointId());
  };

  const { cities } = locations;
  const filtered = cities.filter(
    ({ name }) => name.toUpperCase().indexOf(cityFilterValue.toUpperCase()) >= 0,
  );

  useEffect(() => {
    if (filtered.length === 1 && filtered[0].name === capitalize(cityFilterValue)) {
      const { id, name } = filtered[0];
      addCityHandler(id, name);
    }
  });

  const renderCity = () => {
    return filtered.map(({ id, name }, i) => {
      return (
        <button key={i} onClick={() => addCityHandler(id, name)}>
          {name}
        </button>
      );
    });
  };

  const handleChangeCity = ({ target: { value } }) => {
    dispatch(filterCity(value));
    dispatch(addCityInputValue(value));
  };
  return (
    <div className="map-page__search-city">
      <span>Город</span>
      <input
        type="text"
        value={cityInputValue}
        className="map-page__input"
        onChange={handleChangeCity}
      />
      <button className="map-page__clean-input" onClick={() => dispatch(deleteCityId())}>
        <img src={cleanInput} alt="clean input" />
      </button>
      {cityFilterValue.length > 0 && <div className="map-page__dropdown">{renderCity()}</div>}
    </div>
  );
};
export default CityInput;
