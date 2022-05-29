import * as React from 'react';
import Product from 'types/type.product';
import './ProductCard.scss';
import { numberWithCommas } from '../../utils/numberCommas/numberCommas';
import { percentOff } from '../../utils/percentOfftoFixed/percentOff';
import Nostock from '../../images/no-stock.png';
import { Link } from 'react-router-dom';


interface CardProps {
  Product: Product;
  booleanCol: boolean;
}

const ProductCard: React.FunctionComponent<CardProps> = (props) => {
  const product = props.Product;
  const price = numberWithCommas(product.price);
  const priceOff = numberWithCommas(product.priceOff);

  const createLink: () => void = () => {
    let path: string | null;
    if (product.categoryId === 1) {
      path = 'giay';
    } else if (product.categoryId === 2) {
      path = 'tui-xach';
    } else if (product.categoryId === 3) {
      path = 'balo';
    } else if (product.categoryId === 5) {
      path = 'phu-kien';
    } else path = null;
    return path;
  };
  return (
    <div className={props.booleanCol ? 'col c-3 lg-4 m-6 col-sm-6' : 'product-slide'}>
      <Link to={`/${createLink()}/${product.categoryId}/${product.id}`}>
        <div className="product-item">
          <div
            className={
              product.imgurls.length >= 2 ? 'product-image hov-image' : 'product-image no-active'
            }
          >
            <img src={product.imgurls[0]} alt="" className="avatar before" />
            <img src={product.imgurls[1]} alt="" className="avatar after" />
          </div>
          <div
            className={
              product.imgurls.length >= 2 ? 'single-image no-active' : 'single-image hov-image'
            }
          >
            <img src={product.imgurls[0]} alt="" />
          </div>
          <span className={product.total === 0 ? 'item-inside' : 'item-inside no-active'}>
            <img src={Nostock} alt="" />
          </span>
          <span className="price">
            <ins className={product.saleOff ? 'sale show-color' : 'sale '}>
              <span className="amount">{product.saleOff ? priceOff : price}</span>
              <span className="currency">đ</span>
            </ins>
            <del className={product.saleOff ? 'sale-off' : 'sale-off no-active'}>
              <span className="amount">{product.saleOff ? price : null}</span>
              <span className="currency">đ</span>
            </del>
          </span>
          <h5 className="product-title">{product.name}</h5>
          <ul className="product-tem">
            <li className={product.saleOff ? 'percent-discount' : 'percent-discount no-active'}>
              -{percentOff(parseInt(price), parseInt(priceOff))}%
            </li>
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
