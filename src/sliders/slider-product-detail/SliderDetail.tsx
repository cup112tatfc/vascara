import * as React from 'react';
import './SliderDetail.scss';
import Slider from 'react-slick';
import { SampleNextArrow, SamplePrevArrow } from 'common/customPrevNextSlider/CustomPrevNextSlider';
interface SliderDetailProps {
  ArrayImage: Array<string>;
}

const SliderDetail: React.FunctionComponent<SliderDetailProps> = (props) => {
  const settings = {
    customPaging: function (i: any) {
      return (
        <div>
            <img src={props.ArrayImage[i]} alt="" />
        </div>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Slider {...settings}>
      {props.ArrayImage.map((value, index) => (
        <div key={index} className='item-slide'>
          <img src={ value} alt="" />
        </div>
      ))}
    </Slider>
  );
};

export default SliderDetail;
