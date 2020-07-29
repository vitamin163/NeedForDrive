import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import Order from '../Order/Order.jsx';
import './ModelPage.scss';
import { actions } from '../../../store';

const ModelPage = () => {
  const dispatch = useDispatch();
  const {
    cars: { allIds, byId },
    category,
    order,
  } = useSelector((state) => state);
  const cars = allIds.map((id) => byId[id]);
  const { categoryId } = useSelector((state) => state.modelUIState);
  const { addCars, addCategory, changeCategory, addCarId, addPrice } = actions;
  const {
    carId: { id: carId },
  } = order;
  const defaultCategory = 0;
  const filtered = cars.filter(
    ({ categoryId: { id } }) => id === categoryId || categoryId === defaultCategory,
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
      const imgPath = `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com${path}`;
      const cardClass = cn({
        'model-page__card': true,
        'model-page__card_active': carId === id,
      });

      return (
        <button
          key={i}
          className={cardClass}
          onClick={() => {
            dispatch(addPrice(`${priceMin.toLocaleString('ru')}-${priceMax.toLocaleString('ru')}`));
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
    getCategory();
    getCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClass = (className, id) => {
    return cn({
      [className]: true,
      [`${className}_active`]: categoryId === id,
    });
  };

  const filterHandler = (id) => {
    dispatch(changeCategory(id));
  };

  const { id: allModel } = category['Все модели'];
  const economy = category['Эконом'] && category['Эконом'].id;
  const premium = category['Премиум'] && category['Премиум'].id;

  const buttonClass = cn({
    order__button: true,
    order__button_disabled: !carId,
  });

  return (
    <>
      <div className="order-page__model-page model-page">
        <div className="model-page__filter-container">
          <div className="model-page__row">
            <div className={getClass('model-page__radio', allModel)}></div>
            <button
              className={getClass('model-page__filter-button', allModel)}
              onClick={() => filterHandler(allModel)}
            >
              Все модели
            </button>
          </div>
          <div className="model-page__row">
            <div className={getClass('model-page__radio', economy)}></div>
            <button
              className={getClass('model-page__filter-button', economy)}
              onClick={() => filterHandler(economy)}
            >
              Эконом
            </button>
          </div>
          <div className="model-page__row">
            <div className={getClass('model-page__radio', premium)}></div>
            <button
              className={getClass('model-page__filter-button', premium)}
              onClick={() => filterHandler(premium)}
            >
              Премиум
            </button>
          </div>
        </div>
        <div className="model-page__cards-container">{cars.length > 0 && renderCars()}</div>
      </div>
      <Order buttonName="Дополнительно" buttonClass={buttonClass} />
    </>
  );
};
export default ModelPage;
