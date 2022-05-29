import Banner from 'components/banner/Banner';
import * as React from 'react';
import './Home.scss';
import Image1 from '../../images/sliderHome/1.jpg';
import Image2 from '../../images/sliderHome/2.jpg';
import Image3 from '../../images/sliderHome/3.jpg';
import Image4 from '../../images/sliderHome/4.jpg';
import imageGif from '../../images/8901646998203.gif';

import {
  fetchAsyncProducts,
  fetchAsyncSlideProductNews,
  fetchAsyncSlideProductSaleOff,
} from 'app/productSlice/productSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  productsSelector,
  slideProductNewsSelector,
  SlideProductSaleOffSelector,
} from 'app/selectors';
import ListingProduct from 'components/product-listing/ListingProduct';
import Loading from 'components/loading/Loading';

export const sliderHome = [Image1, Image2, Image3, Image4];
const Home: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const productOnline = useAppSelector(productsSelector);
  const slideProductnews = useAppSelector(slideProductNewsSelector);
  const slideProductSaleOff = useAppSelector(SlideProductSaleOffSelector);
  React.useEffect(() => {
    dispatch(fetchAsyncProducts());
    dispatch(fetchAsyncSlideProductNews());
    dispatch(fetchAsyncSlideProductSaleOff());
  }, [dispatch]);

  return (
    <div className="home-page">
      {Object.keys(productOnline).length === 0 &&
      Object.keys(slideProductnews).length === 0 &&
      Object.keys(slideProductSaleOff).length === 0 ? (
        <Loading loadingBoolean={true} />
      ) : (
        <>
          <Loading loadingBoolean={false} />
          <Banner booleanSlider={true} imageSlider={sliderHome} image={''} />
          <section className="block">
            <div className="title-block">SCARF HANDBAG COLLECTION</div>
            <div className="collection">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <img src={imageGif} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <ListingProduct
            ArrayProduct={productOnline}
            titleBlock={'Onlie Sale'}
            booleanSlide={false}
            btnViewAll={true}
          />
          <ListingProduct
            ArrayProduct={slideProductnews}
            titleBlock={'Sản phẩm mới nhất'}
            booleanSlide={true}
            btnViewAll={true}
          />
          <ListingProduct
            ArrayProduct={slideProductSaleOff}
            titleBlock={'Sản phẩm giảm giá'}
            booleanSlide={true}
            btnViewAll={true}
          />
        </>
      )}
    </div>
  );
};

export default Home;
