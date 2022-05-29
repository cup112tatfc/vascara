import * as React from 'react';
import './SliderListing.scss';
import  Product  from '../../types/type.product';
import Slider from 'react-slick';
import { SampleNextArrow, SamplePrevArrow } from 'common/customPrevNextSlider/CustomPrevNextSlider';
import ProductCard from 'components/product-card/ProductCard';

interface SliderListingProps {
  ArraySlideProduct: Product[];
}

const SliderListing: React.FunctionComponent<SliderListingProps> = (props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Slider {...settings}>
      {props.ArraySlideProduct.map((item, index) => (
        <ProductCard key={index} Product={item} booleanCol={false} />
      ))}
    </Slider>
  );
};

export default SliderListing;
