import * as React from 'react';
import './Banner.scss';
import SlideBanner from '../../sliders/slider-banner/SliderBanner';

interface BannerProps {
  booleanSlider: boolean;
  imageSlider: Array<string>;
  image: string;
}

const Banner: React.FunctionComponent<BannerProps> = (props) => {
  return (
    <div>
      <div className={props.booleanSlider ? 'banner-slider ' : 'banner-slider no-active'} style={{cursor:'pointer'}}>
        <SlideBanner ArrayImage={props.imageSlider} />
      </div>
      <div className={props.booleanSlider ? 'banner-single no-active' : 'banner-single'}>
        <img src={props.image} alt=" "/>
      </div>
    </div>
  );
};

export default Banner;
