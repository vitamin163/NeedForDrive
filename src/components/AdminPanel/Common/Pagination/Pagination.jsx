import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.scss';

const Pagination = ({ totalPage, action, currentPage }) => {
  return (
    <ReactPaginate
      previousLabel={'\u00AB'}
      nextLabel={'\u00BB'}
      breakLabel={'...'}
      pageCount={totalPage}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={action}
      containerClassName={'pagination'}
      breakClassName={'pagination__break-me'}
      activeClassName={'pagination__active'}
      pageClassName={'pagination__page'}
      nextClassName={'pagination__next'}
      previousClassName={'pagination__prev'}
      forcePage={currentPage}
    />
  );
};

export default Pagination;
