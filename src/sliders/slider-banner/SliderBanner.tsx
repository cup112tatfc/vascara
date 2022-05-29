import { SampleNextArrow, SamplePrevArrow } from 'common/customPrevNextSlider/CustomPrevNextSlider';
import * as React from 'react';
import Slider from 'react-slick';

import './SliderBanner.scss';

interface SlideBannerProps {
  ArrayImage: Array<string>;
}

const SlideBanner: React.FunctionComponent<SlideBannerProps> = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots: any) => <ul>{dots}</ul>,
    customPaging: (i: any) => <div className="ft-slick__dots--custom"></div>,
    
  };
  return (
    <div>
      <Slider {...settings}>
        {props.ArrayImage.map((item, index) => (
          <img key={index} src={item} alt="" />
        ))}
      </Slider>
    </div>
  );
};

export default SlideBanner;
