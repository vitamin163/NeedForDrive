import React from 'react';
import './OptionsPage.scss';
import { useDispatch } from 'react-redux';
import { actions } from '../../../store';
import Order from '../Order/Order.jsx';
import RadioButton from '../../RadioButton/RadioBugtton.jsx';
import Checkbox from '../../Checkbox/Checkbox.jsx';
import Input from '../../Input/Input.jsx';

const OptionsPage = () => {
  const dispatch = useDispatch();
  const { changeActiveNav } = actions;
  return (
    <>
      <div className="order-page__options-page options-page">
        <div className="options-page__label">Цвет</div>
        <form className="options-page__colors-container">
          <RadioButton
            items={[{ name: 'Любой', checked: 0 }, { name: 'Красный' }, { name: 'Голубой' }]}
          />
        </form>
        <div className="options-page__label">Дата аренды</div>
        <div className="options-page__rent">
          <Input label="C" value="12.06.2019 12:00" type="datetime" change={() => {}} />
          <Input label="По" placeholder="Введите дату и время" type="datetime" />
        </div>
        <div className="options-page__label">Тариф</div>
        <form className="options-page__rate">
          <RadioButton
            items={[{ name: 'Поминутно, 7₽/мин' }, { name: 'На сутки, 1999 ₽/сутки', checked: 1 }]}
          />
        </form>
        <div className="options-page__label">Доп услуги</div>
        <form className="options-page__other">
          <Checkbox
            items={[
              { name: 'Полный бак, 500р' },
              { name: 'Детское кресло, 200р' },
              { name: 'Правый руль, 1600р' },
            ]}
          />
        </form>
      </div>
      <Order buttonName="Итого" disabled={true} click={() => dispatch(changeActiveNav(3))} />
    </>
  );
};

export default OptionsPage;
