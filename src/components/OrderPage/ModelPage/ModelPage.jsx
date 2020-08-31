import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import Order from '../Order/Order.jsx';
import './ModelPage.scss';
import { actions } from '../../../store';
import RadioButton from '../../RadioButton/RadioBugtton.jsx';
import Spinner from '../../Spinner/Spinner.jsx';
import Error from '../../Error/Error.jsx';

const ModelPage = () => {
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

  useEffect(() => {
    if (isCarsLoaded) {
      dispatch(setRequestState('SUCCESS'));
    }
    const getData = async () => {
      dispatch(setRequestState('REQUEST'));
      try {
        const {
          data: { data: dataCars },
        } = await axios.get(
          'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/car/',
          {
            headers: {
              'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
              Authorization: 'Bearer 4cbcea96de',
            },
          },
        );
        const {
          data: { data: dataCategory },
        } = await axios.get(
          'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/category/',
          {
            headers: {
              'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
              Authorization: 'Bearer 4cbcea96de',
            },
          },
        );
        dispatch(addCars(dataCars));
        dispatch(addCategory(dataCategory));
        dispatch(setRequestState('SUCCESS'));
      } catch (error) {
        console.log(error);
        dispatch(setRequestState('FAILURE'));
      }
    };
    if (!isCarsLoaded) {
      getData();
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
