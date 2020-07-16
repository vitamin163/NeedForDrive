import React from 'react';
import { useSelector } from 'react-redux';
import SlickSlider from 'react-slick';
import icons from '../../../JS/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.scss';

const Slider = () => {
  const { nextButton, prevButton } = icons;
  const content = useSelector((state) => state.slides);
  const slides = content.map(({ img, header, title }, i) => (
    <div className='slider__container' key={i}>
      <div className="slider__content">
        <span className='slider__header'>{header}</span>
        <span className='slider__title'>{title}</span>
        <button className='slider__detail-button'>Подробнее</button>
      </div>

      <div className='slider__gradient'>
        <img className='slider__background' src={img} alt="background" />
      </div>
    </div>
  ));

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className='slider__next-button'
        onClick={onClick}
      />

    );
  };

  const PrevArrow = (props) => {
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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: 'slider__button-bar',
  };
  return (
    <div className="slider">
      <img className='slider__next-icon' src={nextButton} alt="" />
      <SlickSlider {...settings}>
        {slides}
      </ SlickSlider>
      <img className='slider__prev-icon' src={prevButton} alt="" />
    </div>);
};
export default Slider;
