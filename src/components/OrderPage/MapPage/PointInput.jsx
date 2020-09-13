import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { capitalize } from 'lodash';
import { actions } from '@/store';
import './MapPage.scss';
import Input from '@Components/Input';

const PointInput = () => {
  const dispatch = useDispatch();

  const {
    points: { points },
  } = useSelector((state) => state);

  const { cityId } = useSelector((state) => state.order);

  const { pointFilterValue, pointInputValue } = useSelector((state) => state.locationsInput);
  const { filterPoint, addPointInputValue, addPointId, deletePointId } = actions;

  const addDeliveryHandler = (point) => {
    dispatch(addPointId(point));
    dispatch(filterPoint(''));
    dispatch(addPointInputValue(point.address));
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
      const point = filteredByAddress[0];
      addDeliveryHandler(point);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDevilery = () => {
    if (filteredByCity.length === 0 || filteredByAddress.length === 0) {
      return <button>Пункт выдачи не найден</button>;
    }
    return filteredByAddress.map((point) => {
      return (
        <button key={point.id} onClick={() => addDeliveryHandler(point)}>
          {point.address}
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
