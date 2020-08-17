import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import Order from '../Order/Order.jsx';
import './ModelPage.scss';
import { actions } from '../../../store';
import RadioButton from '../../RadioButton/RadioBugtton.jsx';

const ModelPage = () => {
  const dispatch = useDispatch();
  const {
    cars: { allIds, byId },
    category,
    order,
  } = useSelector((state) => state);
  const cars = allIds.map((id) => byId[id]);
  const { categoryModelId } = useSelector((state) => state.uiState);
  const {
    addCars,
    addCategory,
    changeModelCategory,
    addCarId,
    addPrice,
    changeActiveNav,
  } = actions;
  const {
    carId: { id: carId },
  } = order;
  const defaultCategory = 0;
  const filtered = cars.filter(
    ({ categoryId: { id } }) => id === categoryModelId || categoryModelId === defaultCategory,
  );

  const renderCars = () => {
    return filtered.map((car, i) => {
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
          key={i}
          className={cardClass}
          onClick={() => {
            dispatch(
              addPrice(`от ${priceMin.toLocaleString('ru')} до ${priceMax.toLocaleString('ru')}`),
            );
            dispatch(addCarId(id));
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
    const getCars = async () => {
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
        console.log(dataCars);
        dispatch(addCars(dataCars));
      } catch (e) {
        console.log(e);
      }
    };
    const getCategory = async () => {
      try {
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
        dispatch(addCategory(dataCategory));
      } catch (e) {
        console.log(e);
      }
    };
    if (allIds.length === 0) {
      getCategory();
      getCars();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterHandler = (id) => {
    dispatch(changeModelCategory(id));
  };

  const renderCategory = (items) =>
    items.map((item, i) => {
      const { name, id } = item;
      return <RadioButton key={i} name={name} checked={i === 0} click={() => filterHandler(id)} />;
    });

  return (
    <>
      <div className="order-page__model-page model-page">
        <div className="model-page__filter-container">{renderCategory(category)}</div>
        <div className="model-page__cards-container">{cars.length > 0 && renderCars()}</div>
      </div>
      <Order
        buttonName="Дополнительно"
        disabled={!carId}
        click={() => dispatch(changeActiveNav(2))}
      />
    </>
  );
};
export default ModelPage;
