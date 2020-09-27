import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '@/store';
import getData from '@/store/fetchData';
import { getTokens } from '@/utils';
import emptyImage from '@/img/vwBeetle.jpg';
import './CarList.scss';
import Spinner from '../Common/Spinner';
import Pagination from '../Common/Pagination';
import Filter from '../Common/Filter';
import FilterButton from '../Common/FilterButton';

const CarList = ({ proxy, api, headers }) => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.cars);
  const { category } = useSelector((state) => state.category);
  const { requestState } = useSelector((state) => state.asyncRequestState);
  const { carsPageSize, currentCarsPage, totalCarsPage } = useSelector((state) => state.admin);
  const { addCars, setCurrentPage, addCategory, setCategoryLoaded, setCarsLoaded } = actions;

  const fetchData = [
    {
      url: `${proxy}${api}db/car?page=${currentCarsPage}&limit=${carsPageSize}`,
      action: addCars,
    },
    {
      url: `${proxy}${api}db/category/`,
      action: addCategory,
    },
  ];

  const didMountRef = useRef(false);
  useEffect(() => {
    const { accessToken } = getTokens();

    if (!didMountRef.current) {
      console.log('getData');
      dispatch(
        getData(fetchData, {
          ...headers,
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
          Authorization: `Bearer ${accessToken}`,
        }),
      );
    } else {
      didMountRef.current = true;
    }
    return () => {
      dispatch(setCategoryLoaded(false));
      dispatch(setCarsLoaded(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSelect = (items) => {
    return items.map(({ name, id }) => {
      return (
        <option key={name} value={id}>
          {name}
        </option>
      );
    });
  };

  const submitHandler = async ({ byCategory, byPriceMin, byPriceMax }) => {
    const { accessToken } = getTokens();
    const queryByCategory = byCategory ? `categoryId[id]=${byCategory}` : '';
    const queryByPriceMin = byPriceMin ? `priceMin[$gt]=${byPriceMin - 1}` : '';
    const queryByPriceMax = byPriceMax ? `priceMax[$lt]=${byPriceMax + 1}` : '';
    const paginate = `page=${currentCarsPage}&limit=${carsPageSize}`;
    const urlParts = `${proxy}${api}db/car?`;
    const queryParts = [queryByCategory, queryByPriceMin, queryByPriceMax, paginate]
      .filter((item) => !!item)
      .join('&');
    const url = `${urlParts}${queryParts}`;
    dispatch(
      getData(
        [
          {
            url,
            action: addCars,
          },
        ],
        {
          ...headers,
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
          Authorization: `Bearer ${accessToken}`,
        },
      ),
    );
  };

  const handlePageClick = async (e) => {
    const selectedPage = e.selected;
    dispatch(setCurrentPage({ page: selectedPage, name: 'currentCarsPage' }));
  };

  const renderModel = () => {
    const renderItem = (title, name) => {
      return (
        <td>
          <span>{title}</span>
          {name}
        </td>
      );
    };
    return cars.map((car) => {
      const { id, name, categoryId, description, priceMin, priceMax, number, tank, colors } = car;
      const imgPath = car.thumbnail
        ? `http://api-factory.simbirsoft1.com${car.thumbnail.path}`
        : emptyImage;
      return (
        <tr key={id}>
          <td>
            <span>Фото</span>
            <img src={imgPath} alt="car" className="carList__img" />
          </td>
          {renderItem('Модель', name)}
          {renderItem('Описание', description)}
          {renderItem('Категория', categoryId.name)}
          {renderItem('Минимальная цена', `${priceMin.toLocaleString('ru')} ₽`)}
          {renderItem('Максимальная цена', `${priceMax.toLocaleString('ru')} ₽`)}
          {renderItem('Гос номер', number)}
          {renderItem('Топливо', tank)}
          {renderItem('Цвет', colors.join(' '))}
        </tr>
      );
    });
  };

  return (
    <div className="carList">
      <div className="carList__sub-header">Список автомобилей</div>
      <div className="carList__container">
        <div className="carList__topbar">
          <Filter
            initialValues={{
              byCategory: '',
              byPriceMin: '',
              byPriceMax: '',
            }}
            onSubmit={submitHandler}
          >
            <FilterButton
              name="byCategory"
              as="select"
              render={() => renderSelect(category)}
            ></FilterButton>

            <FilterButton
              name="byPriceMin"
              as="input"
              type="number"
              placeholder="Минимальная цена"
            />
            <FilterButton
              name="byPriceMax"
              as="input"
              type="number"
              placeholder="Максимальная цена"
            />
          </Filter>
        </div>
        <div className="carList__content">
          <table className="carList__tab">
            <thead>
              <tr>
                <th>Фото</th>
                <th>Модель</th>
                <th>Описание</th>
                <th>Категория</th>
                <th>Минимальная цена</th>
                <th>Максимальная цена</th>
                <th>Гос номер</th>
                <th>Топливо</th>
                <th>Цвет</th>
              </tr>
            </thead>
            {requestState === 'SUCCESS' && <tbody>{renderModel()}</tbody>}
          </table>
        </div>
        {requestState === 'REQUEST' && <Spinner />}
        <div className="carList__footer">
          {
            <Pagination
              totalPage={totalCarsPage}
              action={handlePageClick}
              currentPage={currentCarsPage}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default CarList;
