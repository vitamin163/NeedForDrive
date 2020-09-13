import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import './ModelPage.scss';
import { actions } from '@/store';
import RadioButton from '@Components/RadioButton';
import Spinner from '@Components/Spinner';
import Error from '@Components/Error';
import getData from '@/store/fetchData';
import Order from '../Order';

const ModelPage = (props) => {
  const { proxy, api, headers } = props;
  const dispatch = useDispatch();
  const {
    cars: { cars, isCarsLoaded },
    category,
    order,
  } = useSelector((state) => state);
  const { categoryModelId } = useSelector((state) => state.uiState);
  const { requestState } = useSelector((state) => state.asyncRequestState);
  const {
    addCars,
    addCategory,
    changeModelCategory,
    addCarId,
    addPrice,
    changeActiveNav,
    setRequestState,
  } = actions;
  const {
    carId: { id: carId },
  } = order;
  const defaultCategory = 0;
  const filtered = cars.filter(
    ({ categoryId: { id } }) => id === categoryModelId || categoryModelId === defaultCategory,
  );

  const renderCars = () => {
    return filtered.map((car) => {
      const name = car.name.split(',')[1];
      const {
        id,
        priceMin,
        priceMax,
        thumbnail: { path },
      } = car;
      const imgPath = `http://api-factory.simbirsoft1.com${path}`;
      const cardClass = cn({
        'model-page__card': true,
        'model-page__card_active': carId === id,
      });

      return (
        <button
          key={id}
          className={cardClass}
          onClick={() => {
            dispatch(
              addPrice(`от ${priceMin.toLocaleString('ru')} до ${priceMax.toLocaleString('ru')}`),
            );
            dispatch(addCarId(car));
          }}
        >
          <div className="model-page__info">
            <span className="model-page__name">{name}</span>
            <span className="model-page__price">
              {priceMin.toLocaleString('ru')}-{priceMax.toLocaleString('ru')} ₽
            </span>
          </div>
          <div className="model-page__img">
            <img crossOrigin="anonymous" referrerPolicy="origin" src={imgPath} alt="car" />
          </div>
        </button>
      );
    });
  };
  const fetchData = [
    {
      url: `${proxy}${api}car/`,
      action: addCars,
    },
    {
      url: `${proxy}${api}category/`,
      action: addCategory,
    },
  ];
  useEffect(() => {
    if (isCarsLoaded) {
      dispatch(setRequestState('SUCCESS'));
    }
    if (!isCarsLoaded) {
      dispatch(getData(fetchData, headers));
    }
    return () => {
      dispatch(setRequestState(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterHandler = (id) => {
    dispatch(changeModelCategory(id));
  };

  const renderCategory = (items) =>
    items.map((item, i) => {
      const { name, id } = item;
      return <RadioButton key={id} name={name} checked={i === 0} click={() => filterHandler(id)} />;
    });

  return (
    <>
      {requestState === 'REQUEST' && <Spinner />}
      {requestState === 'SUCCESS' && (
        <div className="order-page__model-page model-page">
          <div className="model-page__filter-container">{renderCategory(category)}</div>
          <div className="model-page__cards-container">{cars.length > 0 && renderCars()}</div>
        </div>
      )}
      {requestState === 'FAILURE' && <Error text="Не удалось получить данные" />}
      <Order
        buttonName="Дополнительно"
        disabled={!carId}
        click={() => dispatch(changeActiveNav(2))}
      />
    </>
  );
};
export default ModelPage;
