import React from 'react';
import './FilterButton.scss';
import { filterArrow } from '../../../icon';

const FilterButton = (props) => {
  const { name } = props;
  return (
    <button className="filterButton">
      {name}
      <img src={filterArrow} alt="filterButton" />
    </button>
  );
};

export default FilterButton;
