import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { capitalize } from 'lodash';
import { actions } from '../../../store';
import './MapPage.scss';
import Input from '../../Input/Input.jsx';

const PointInput = () => {
  const dispatch = useDispatch();

  const {
    points: { allIds, byId },
  } = useSelector((state) => state);
  const points = allIds.map((id) => byId[id]);

  const { cityId } = useSelector((state) => state.order);

  const { pointFilterValue, pointInputValue } = useSelector((state) => state.locationsInput);
  const { filterPoint, addPointInputValue, addPointId, deletePointId } = actions;

  const addDeliveryHandler = (id, address) => {
    dispatch(addPointId(id));
    dispatch(filterPoint(''));
    dispatch(addPointInputValue(address));
  };

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
    if (filteredByCity.length === 0 || filteredByAddress.length === 0) {
      return <button>Пункт выдачи не найден</button>;
    }
    return filteredByAddress.map(({ id, address }) => {
      return (
        <button key={id} onClick={() => addDeliveryHandler(id, address)}>
          {address}
        </button>
      );
    });
  };

  const handleChangeDelivery = ({ target: { value } }) => {
    dispatch(filterPoint(value));
    dispatch(addPointInputValue(value));
  };
  return (
    <Input
      label="Пункт выдачи"
      type="text"
      value={pointInputValue}
      change={handleChangeDelivery}
      click={() => dispatch(deletePointId())}
      placeholder="Начните вводить пункт..."
      disable={!cityId.id}
      dropdown={
        pointFilterValue.length > 0 && <div className="map-page__dropdown">{renderDevilery()}</div>
      }
    />
  );
};

export default PointInput;
