import React from 'react';
import SlickSlider from 'react-slick';
import carImage1 from '../../../img/tesla.jpg';
import nextButton from '../../../img/nextButton.svg';
import prevButton from '../../../img/prevButton.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.scss';

const Slider = () => {
  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className='slider__next-button'
        onClick={onClick}
      />

    );
  };

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className='slider__prev-button'
        onClick={onClick}
      />
    );
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dotsClass: 'slider__button-bar',
  };
  return (
    <div className="slider">
      <img className='slider__next-icon' src={nextButton} alt="" />
      <SlickSlider {...settings}>
        <div className='slider__container'>
          <div className="slider__content">
            <span className='slider__header'>Бесплатная парковка</span>
            <span className='slider__title'>Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.</span>
            <button className='slider__detail-button'>Подробнее</button>
          </div>

          <div className='slider__gradient'>
            <img className='slider__background' src={carImage1} alt="background" />
          </div>
        </div>
      </ SlickSlider>
      <img className='slider__prev-icon' src={prevButton} alt="" />
    </div>);
};
export default Slider;
