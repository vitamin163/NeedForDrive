import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { capitalize } from 'lodash';
import { actions } from '../../../store';
import './MapPage.scss';
import Input from '../../Input/Input.jsx';

const CityInput = () => {
  const dispatch = useDispatch();

  const {
    cities: { allIds, byId },
  } = useSelector((state) => state);

  const cities = allIds.map((id) => byId[id]);

  const { cityFilterValue, cityInputValue } = useSelector((state) => state.locationsInput);

  const { filterCity, addCityInputValue, addCityId, deleteCityId, deletePointId } = actions;

  const addCityHandler = (id, name) => {
    dispatch(addCityId(id));
    dispatch(filterCity(''));
    dispatch(addCityInputValue(name));
    dispatch(deletePointId());
  };

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

  const selectHandler = (event) => {
    if (event.keyCode === 40) {
      console.log(true);
    }
  };

  return (
    <Input
      label="Город"
      type="text"
      value={cityInputValue}
      change={handleChangeCity}
      keydown={selectHandler}
      click={() => dispatch(deleteCityId())}
      placeholder="Начните вводить город..."
      dropdown={
        cityFilterValue.length > 0 && <div className="map-page__dropdown">{renderCity()}</div>
      }
    />
  );
};
export default CityInput;
