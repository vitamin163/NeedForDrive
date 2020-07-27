import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { capitalize } from 'lodash';
import cn from 'classnames';
import { actions } from '../../../slices';
import './MapPage.scss';
import icons from '../../../JS/icons';

const PointInput = () => {
  const dispatch = useDispatch();

  const locations = useSelector((state) => state.locations);
  const { cityId } = useSelector((state) => state.order);

  const { pointFilterValue, pointInputValue } = useSelector((state) => state.locationsInput);
  const { filterPoint, addPointInputValue, addPointId, deletePointId } = actions;
  const { cleanInput } = icons;

  const addDeliveryHandler = (id, address) => {
    dispatch(addPointId(id));
    dispatch(filterPoint(''));
    dispatch(addPointInputValue(address));
  };
  const { points } = locations;
  const filteredByCity = points.filter(({ cityId: { id } }) => id === cityId.id);

  const filteredByAddress = filteredByCity.filter(
    ({ address }) => address.toUpperCase().indexOf(pointFilterValue.toUpperCase()) >= 0,
  );

  useEffect(() => {
    if (
      filteredByAddress.length === 1 &&
      filteredByAddress[0].address === capitalize(pointInputValue)
    ) {
      const { id, address } = filteredByAddress[0];
      addDeliveryHandler(id, address);
    }
  });

  const renderDevilery = () => {
    return filteredByAddress.map(({ id, address }, i) => {
      return (
        <button key={i} onClick={() => addDeliveryHandler(id, address)}>
          {address}
        </button>
      );
    });
  };

  const handleChangeDelivery = ({ target: { value } }) => {
    dispatch(filterPoint(value));
    dispatch(addPointInputValue(value));
  };

  const inputClass = cn({
    'map-page__input': true,
    'map-page__input_disable': !cityId.id,
  });
  return (
    <div className="map-page__search-delivery">
      <span>Пункт выдачи</span>
      <input
        value={pointInputValue}
        onChange={handleChangeDelivery}
        type="text"
        className={inputClass}
      />
      <button className="map-page__clean-input" onClick={() => dispatch(deletePointId())}>
        <img src={cleanInput} alt="clean input" />
      </button>
      {pointFilterValue.length > 0 && <div className="map-page__dropdown">{renderDevilery()}</div>}
    </div>
  );
};

export default PointInput;
