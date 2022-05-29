import ProductCard from 'components/product-card/ProductCard';
import * as React from 'react';
import Product from 'types/type.product';
import { Link } from 'react-router-dom';
import './ListingProduct.scss';
import SliderListing from '../../sliders/slider-listing-product/SliderListing';

interface ListingProductProps {
  ArrayProduct: Product[];
  booleanSlide: boolean;
  titleBlock?: string;
  btnViewAll: boolean;
}

const ListingProduct: React.FunctionComponent<ListingProductProps> = (props) => {
  return (
    <section className="block">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="title-block">
              {props.titleBlock}
              {props.btnViewAll && (
                <Link to="#" className="pc view-all">
                  Xem tất cả
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={props.booleanSlide ? 'listing-product no-active' : 'listing-product'}>
        <div className="container">
          <div className="row">
            {props.ArrayProduct.map((item, index) => (
              <ProductCard key={index} Product={item} booleanCol={true} />
            ))}
          </div>
        </div>
      </div>
      <div className={props.booleanSlide ? 'slide-product' : 'slide-product no-active '}>
        <div className="container">
          <div className="slider">
            <SliderListing ArraySlideProduct={props.ArrayProduct} />
          </div>
        </div>
      </div>
      <div className="view mobi">
        {props.btnViewAll && (
          <Link to={'/'} className="view-all">
            Xem tất cả
          </Link>
        )}
      </div>
    </section>
  );
};

export default React.memo(ListingProduct);
