import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProductDetail.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { productIdSelector, productSamesSelector } from 'app/selectors';
import {
  fetchAsyncProductId,
  removeProductDetail,
  fetchAsyncProductSames,
  removeProductSames,
} from 'app/productSlice/productSlice';
import ImageHDCS from '../../images/Huong-Dan-Chon-Size-Vascara-31032022-desk.jpg';
import ImageHDBQ from '../../images/Huong-Dan-Bao-Quan-Tui-Vi-31032022-desk.jpg';
import Product from '../../types/type.product';
import SliderDetail from 'sliders/slider-product-detail/SliderDetail';
import ListingProduct from 'components/product-listing/ListingProduct';
import { numberWithCommas } from 'utils/numberCommas/numberCommas';
import { percentOff } from 'utils/percentOfftoFixed/percentOff';
import useOutsideClick from 'utils/customHooks/useOutsideClick';
import Loading from 'components/loading/Loading';
import { ProductOfCart } from 'types/type.cart';
import {
  CheckProductOfCart,
  PriceMain,
  TotalPrice,
} from 'utils/checkProductOfCart/CheckProductOfCart';
import { AddtoCartBeforLogin } from 'app/cartSlice/cartSlice';
import Popup from 'components/popup/Popup';

const ProductDetail: React.FunctionComponent = () => {
  const { categoryId, productId } = useParams<string>();
  const dispatch = useAppDispatch();
  const product: Product = useAppSelector(productIdSelector);
  const productSames = useAppSelector(productSamesSelector);
  const [idTab, setIdTab] = React.useState<number>(1);
  const [quantity, setQuantity] = React.useState<number>(1);
  const [choseSize, setChoseSize] = React.useState<string | number>('');
  const [checktoAdd, setCheckToAdd] = React.useState<boolean>(false);
  const [add, setAdd] = React.useState<boolean>(false);
  const [productOfCart, setProductOfCart] = React.useState<ProductOfCart>({} as ProductOfCart);
  const [error, setError] = React.useState<string>('');
  const [isOpenPropup, setIsOpenPropup] = React.useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/\D/g.test(e.target.value)) {
      e.target.value = e.target.value.replace(/\D/g, '');
    }
    setQuantity(Number(e.target.value));
  };

  const handleMinus = () => {
    if (quantity === 1) {
      setQuantity(quantity);
    } else {
      setQuantity(quantity - 1);
    }
  };
  const handlePlus = () => {
    if (quantity === product.total) {
      setQuantity(product.total);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const bookNumberRef = React.useRef<any>(null);

  useOutsideClick(bookNumberRef, quantity, () => {
    if (quantity === 0) {
      setQuantity(1);
    } else if (quantity > product.total) {
      setQuantity(product.total);
    } else {
      setQuantity(quantity);
    }
  });
  const handleCheck = (size: string | number) => {
    CheckProductOfCart(product, size, productOfCart, setError, setCheckToAdd, setProductOfCart);
  };
  const handleAdd = () => {
    if (checktoAdd || !product.sizes) {
      dispatch(AddtoCartBeforLogin(productOfCart));
      setIsOpenPropup(true);
    } else {
      setCheckToAdd(false);
      setIsOpenPropup(false);
    }
  };
  React.useEffect(() => {
    dispatch(fetchAsyncProductId(productId));
    dispatch(fetchAsyncProductSames({ idCate: categoryId, idProduct: productId }));

    return () => {
      dispatch(removeProductDetail({}));
      dispatch(removeProductSames([]));
    };
  }, [dispatch, productId, categoryId]);
  React.useEffect(() => {
    setProductOfCart({
      ...productOfCart,
      id: product.id,
      categoryId: product.categoryId,
      img: product.imgurls,
      color: product.color,
      name: product.name,
      price: product.price,
      priceOff: product.priceOff,
      quantity: quantity,
      priceMain: PriceMain(product),
      totalPrice: PriceMain(product),
      totalQuantity: product.total,
    });
  }, [product]);
  React.useMemo(() => {
    setProductOfCart({
      ...productOfCart,
      quantity: quantity,
      totalPrice: quantity * productOfCart.priceMain,
    });
  }, [quantity]);

  return (
    <>
      <Popup isOpen={isOpenPropup} closeOpen={(isOpenPropup) => setIsOpenPropup(isOpenPropup)} />
      {Object.keys(product).length === 0 ? (
        <Loading loadingBoolean={true} />
      ) : (
        <>
          <Loading loadingBoolean={false} />

          <div className="page-product">
            <div className="breadcrumb">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <ul>
                      <li>
                        <Link to={'/'}>Trang ch???</Link>
                      </li>
                      <li>
                        <Link
                          to={`${
                            product.categoryId === 1
                              ? '/giay'
                              : product.categoryId === 2
                              ? '/tui-xach'
                              : product.categoryId === 3
                              ? '/balo'
                              : product.categoryId === 5
                              ? '/phu-kien'
                              : '#'
                          }`}
                        >
                          {product.categoryId === 1
                            ? 'Gi??y'
                            : product.categoryId === 2
                            ? 'T??i x??ch'
                            : product.categoryId === 3
                            ? 'Ba l??'
                            : product.categoryId === 5
                            ? 'Ph??? ki???n'
                            : 'zalo'}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-detail">
              <div className="container">
                <div className="row">
                  <div className="col c-7 l-12 m-12">
                    <div className="slide-detail">
                      <SliderDetail ArrayImage={product.imgurls} />
                    </div>
                    <div className="content-product pc hide">
                      <div className="group-content-product">
                        <ul className="head">
                          <li className={idTab === 1 ? 'active' : ''} onClick={() => setIdTab(1)}>
                            <h2>Th??ng tin chi ti???t</h2>
                          </li>
                          {product.categoryId === 1 ||
                          product.categoryId === 2 ||
                          product.categoryId === 3 ? (
                            <li className={idTab === 2 ? 'active' : ''} onClick={() => setIdTab(2)}>
                              <h2>
                                {product.categoryId === 1
                                  ? 'H?????ng d???n ch???n Size'
                                  : 'H?????ng d???n b???o qu???n'}
                              </h2>
                            </li>
                          ) : (
                            ''
                          )}
                        </ul>
                        {product.categoryId === 1 ? (
                          <div className="body">
                            <div className={idTab === 1 ? 'body-ct' : 'body-ct hide'}>
                              <ul className="list-oppr">
                                <li>
                                  <span>M?? s???n ph???m</span>
                                  <span>{product.information.model}</span>
                                </li>
                                <li>
                                  <span>Lo???i s???n ph???m</span>
                                  <span>{product.information.type}</span>
                                </li>
                                <li>
                                  <span>Ki???u g??t</span>
                                  <span>{product.information.heelStyle}</span>
                                </li>
                                <li>
                                  <span>????? cao g??t</span>
                                  <span>{product.information.toeStyle}</span>
                                </li>
                                <li>
                                  <span>Lo???i m??i</span>
                                  <span>{product.information.heelHeight}</span>
                                </li>
                                <li>
                                  <span>Ch???t li???u</span>
                                  <span>{product.information.material}</span>
                                </li>
                                <li>
                                  <span>Hoa v??n, chi ti???t</span>
                                  <span>{product.information.pattern}</span>
                                </li>
                                <li>
                                  <span>Ph?? h???p s??? d???ng</span>
                                  <span>{product.information.suitable}</span>
                                </li>
                              </ul>
                            </div>
                            <div className={idTab === 2 ? 'body-ct' : 'body-ct hide'}>
                              <div>
                                <img src={ImageHDCS} alt="" />
                              </div>
                            </div>
                          </div>
                        ) : product.categoryId === 2 ? (
                          <div className="body">
                            <div className={idTab === 1 ? 'body-ct' : 'body-ct hide'}>
                              <ul className="list-oppr">
                                <li>
                                  <span>M?? s???n ph???m</span>
                                  <span>{product.information.model}</span>
                                </li>
                                <li>
                                  <span>Lo???i s???n ph???m</span>
                                  <span>{product.information.type}</span>
                                </li>
                                <li>
                                  <span>Ch???t li???u</span>
                                  <span>{product.information.material}</span>
                                </li>
                                <li>
                                  <span>Hoa v??n, chi ti???t</span>
                                  <span>{product.information.pattern}</span>
                                </li>
                                <li>
                                  <span>K??ch th?????c (d??i x r???ng x cao)</span>
                                  <span>{product.information.Dimensions}</span>
                                </li>
                                <li>
                                  <span>Ch???t li???u d??y ??eo</span>
                                  <span>{product.information.strap_material}</span>
                                </li>
                                <li>
                                  <span>Chi???u d??i d??y ??eo</span>
                                  <span>{product.information.pattern}</span>
                                </li>
                                <li>
                                  <span>Ki???u kh??a</span>
                                  <span>{product.information.lock_type}</span>
                                </li>
                                <li>
                                  <span>S??? ng??n</span>
                                  <span>{product.information.compartment}</span>
                                </li>
                                <li>
                                  <span>K??ch c???</span>
                                  <span>{product.information.size}</span>
                                </li>
                                <li>
                                  <span>Ph?? h???p s??? d???ng</span>
                                  <span>{product.information.suitable}</span>
                                </li>
                              </ul>
                            </div>
                            <div className={idTab === 2 ? 'body-ct' : 'body-ct hide'}>
                              <div>
                                <img src={ImageHDBQ} alt="" />
                              </div>
                            </div>
                          </div>
                        ) : product.categoryId === 3 ? (
                          <div className="body">
                            <div className={idTab === 1 ? 'body-ct' : 'body-ct hide'}>
                              <ul className="list-oppr">
                                <li>
                                  <span>M?? s???n ph???m</span>
                                  <span>{product.information.model}</span>
                                </li>
                                <li>
                                  <span>Lo???i s???n ph???m</span>
                                  <span>{product.information.type}</span>
                                </li>
                                <li>
                                  <span>K??ch th?????c (d??i x r???ng x cao)</span>
                                  <span>{product.information.Dimensions}</span>
                                </li>
                                <li>
                                  <span>Ch???t li???u d??y ??eo</span>
                                  <span>{product.information.strap_material}</span>
                                </li>
                                <li>
                                  <span>Ki???u kh??a</span>
                                  <span>{product.information.lock_type}</span>
                                </li>
                                <li>
                                  <span>S??? ng??n</span>
                                  <span>{product.information.compartment}</span>
                                </li>
                                <li>
                                  <span>K??ch c???</span>
                                  <span>{product.information.size}</span>
                                </li>
                                <li>
                                  <span>Ph?? h???p s??? d???ng</span>
                                  <span>{product.information.suitable}</span>
                                </li>
                              </ul>
                            </div>
                            <div className={idTab === 2 ? 'body-ct' : 'body-ct hide'}>
                              <div>
                                <img src={ImageHDBQ} alt="" />
                              </div>
                            </div>
                          </div>
                        ) : product.categoryId === 5 && product.type === 'belt' ? (
                          <div className="body">
                            <div className={idTab === 1 ? 'body-ct' : 'body-ct hide'}>
                              <ul className="list-oppr">
                                <li>
                                  <span>M?? s???n ph???m</span>
                                  <span>{product.information.model}</span>
                                </li>
                                <li>
                                  <span>Lo???i s???n ph???m</span>
                                  <span>{product.information.type}</span>
                                </li>
                                <li>
                                  <span>Ch???t li???u d??y ??eo</span>
                                  <span>{product.information.strap_material}</span>
                                </li>
                                <li>
                                  <span>B???n d??y</span>
                                  <span>{product.information.with}</span>
                                </li>
                                <li>
                                  <span>Chi???u d??i</span>
                                  <span>{product.information.length}</span>
                                </li>
                              </ul>
                            </div>
                            {product.type === 'belt' || (
                              <div className={idTab === 2 ? 'body-ct' : 'body-ct hide'}>
                                <div>
                                  <img src={ImageHDBQ} alt="" />
                                </div>
                              </div>
                            )}
                          </div>
                        ) : product.categoryId === 5 && product.type === 'glass' ? (
                          <div className="body">
                            <div className={idTab === 1 ? 'body-ct' : 'body-ct hide'}>
                              <ul className="list-oppr">
                                <li>
                                  <span>M?? s???n ph???m</span>
                                  <span>{product.information.model}</span>
                                </li>
                                <li>
                                  <span>Lo???i s???n ph???m</span>
                                  <span>{product.information.type}</span>
                                </li>
                                <li>
                                  <span>Ch???t li???u g???ng k??nh</span>
                                  <span>{product.information.strap_material}</span>
                                </li>
                                <li>
                                  <span>C??ng ngh??? tr??ng k??nh</span>
                                  <span>{product.information.lenses}</span>
                                </li>
                                <li>
                                  <span>Ki???u k??nh</span>
                                  <span>{product.information.glasses}</span>
                                </li>
                                <li>
                                  <span>Ki???u khu??n m???t ph?? h???p</span>
                                  <span>{product.information.suitableFace}</span>
                                </li>
                              </ul>
                            </div>
                            {product.type === 'glass' || (
                              <div className={idTab === 2 ? 'body-ct' : 'body-ct hide'}>
                                <div>
                                  <img src={ImageHDBQ} alt="" />
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col c-5 l-12 m-12">
                    <div className="product-info">
                      <h1 className="title-product">{product.name}</h1>
                      <ul className="product-tem">
                        <li
                          className={
                            product.saleOff ? 'percent-discount' : 'percent-discount no-active'
                          }
                        >
                          -{percentOff(product.price, product.priceOff)}%
                        </li>
                      </ul>
                      <span className="price sale">
                        {product.saleOff && (
                          <ins>
                            <span className="amount">{numberWithCommas(product.priceOff)}</span>
                            <span className="currency">??</span>
                          </ins>
                        )}
                        <del>
                          <span className={product.saleOff ? 'amount line_through' : 'amount'}>
                            {numberWithCommas(product.price)}
                          </span>
                          <span className={product.saleOff ? 'currency line_through' : 'currency'}>
                            ??
                          </span>
                        </del>
                      </span>
                      {product.total > 0 ? (
                        <div>
                          {product.sizes && (
                            <div className="group-attr group-size size cus-size">
                              <div className="title-attr">
                                K??ch c???
                                <span className="error lbl-size-err">{error}</span>
                              </div>
                              <ul className="list-size">
                                {product.sizes?.map((value, index) => (
                                  <li
                                    className={
                                      value === choseSize ? 'lisize active-size' : 'lisize'
                                    }
                                    key={index}
                                    onClick={() => {
                                      setChoseSize(value);
                                      handleCheck(value);
                                    }}
                                  >
                                    {value}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div className="group-attr quantity cus-quantity">
                            <div className="title-attr">S??? l?????ng</div>
                            <div className="quantity-product">
                              <div className="book-number" ref={bookNumberRef}>
                                <div className="item-change minus" onClick={handleMinus}>
                                  -
                                </div>
                                <div className="input-number">
                                  <input
                                    autoComplete="off"
                                    value={quantity}
                                    id="fquantity"
                                    onChange={handleInput}
                                  />
                                </div>
                                <div className="item-change plus" onClick={handlePlus}>
                                  +
                                </div>
                              </div>
                              <div className="total-available">{product.total} s???n ph???m c?? s???n</div>
                            </div>
                          </div>
                          <div
                            className="button buy-now"
                            onClick={() => {
                              handleCheck(choseSize);
                              handleAdd();
                            }}
                          >
                            MUA NGAY
                          </div>
                        </div>
                      ) : (
                        <span className="out-of-stock">S???n ph???m T???m h???t h??ng </span>
                      )}
                      <div className="promotion-content">
                        <div className="item-promotion fgift">
                          <strong>
                            <span style={{ color: '#ff529c' }}>
                              MI???N PH?? V???N CHUY???N TO??N QU???C CHO ????N H??NG T??? 699K.
                            </span>
                          </strong>
                        </div>
                        <div className="item-promotion fchat">
                          <strong>
                            <span style={{ color: '#ff529c' }}>CHAT V???I NH??N VI??N T?? V???N</span>
                          </strong>
                        </div>
                        <div className="item-promotion fhotcall">
                          <strong>
                            <span>1900 6909</span>
                          </strong>
                          <span style={{ color: '#444444' }}>
                            {' '}
                            - HOTLINE ?????T H??NG (9H&nbsp;- 22H){' '}
                          </span>
                        </div>
                        <div className="item-promotion ffreereturning">
                          <span style={{ color: '#444444' }}>
                            GI???M 10% THU??? VAT XU???NG C??N 8% T??? NG??Y 01.02.2022.{' '}
                          </span>
                          <span>
                            <em>
                              <strong>
                                <a href="#" style={{ fontFamily: 'GARAMONDPREMRPRO' }}>
                                  Xem chi ti???t
                                </a>
                              </strong>
                            </em>
                          </span>
                        </div>
                        <div className="item-promotion freturns">
                          <span style={{ color: '#444444' }}>
                            MUA H??NG ONLINE - MI???N PH?? TR??? H??NG HO??N TI???N T???I C???A H??NG TRONG 17
                            NG??Y.{' '}
                          </span>
                          <span>
                            <em>
                              <strong>
                                <a href="#" style={{ fontFamily: 'GARAMONDPREMRPRO' }}>
                                  Xem chi ti???t
                                </a>
                              </strong>
                            </em>
                          </span>
                        </div>
                      </div>
                      <div className="content-product pc mobi">
                        <div className="group-content-product">
                          <ul className="head">
                            <li className={idTab === 1 ? 'active' : ''} onClick={() => setIdTab(1)}>
                              <h2>Th??ng tin chi ti???t</h2>
                            </li>
                            {product.categoryId === 1 ||
                            product.categoryId === 2 ||
                            product.categoryId === 3 ? (
                              <li
                                className={idTab === 2 ? 'active' : ''}
                                onClick={() => setIdTab(2)}
                              >
                                <h2>
                                  {product.categoryId === 1
                                    ? 'H?????ng d???n ch???n Size'
                                    : 'H?????ng d???n b???o qu???n'}
                                </h2>
                              </li>
                            ) : (
                              ''
                            )}
                          </ul>
                          {product.categoryId === 1 ? (
                            <div className="body">
                              <div className={idTab === 1 ? 'body-ct' : 'body-ct hide'}>
                                <ul className="list-oppr">
                                  <li>
                                    <span>M?? s???n ph???m</span>
                                    <span>{product.information.model}</span>
                                  </li>
                                  <li>
                                    <span>Lo???i s???n ph???m</span>
                                    <span>{product.information.type}</span>
                                  </li>
                                  <li>
                                    <span>Ki???u g??t</span>
                                    <span>{product.information.heelStyle}</span>
                                  </li>
                                  <li>
                                    <span>????? cao g??t</span>
                                    <span>{product.information.toeStyle}</span>
                                  </li>
                                  <li>
                                    <span>Lo???i m??i</span>
                                    <span>{product.information.heelHeight}</span>
                                  </li>
                                  <li>
                                    <span>Ch???t li???u</span>
                                    <span>{product.information.material}</span>
                                  </li>
                                  <li>
                                    <span>Hoa v??n, chi ti???t</span>
                                    <span>{product.information.pattern}</span>
                                  </li>
                                  <li>
                                    <span>Ph?? h???p s??? d???ng</span>
                                    <span>{product.information.suitable}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className={idTab === 2 ? 'body-ct' : 'body-ct hide'}>
                                <div>
                                  <img src={ImageHDCS} alt="" />
                                </div>
                              </div>
                            </div>
                          ) : product.categoryId === 2 ? (
                            <div className="body">
                              <div className={idTab === 1 ? 'body-ct' : 'body-ct hide'}>
                                <ul className="list-oppr">
                                  <li>
                                    <span>M?? s???n ph???m</span>
                                    <span>{product.information.model}</span>
                                  </li>
                                  <li>
                                    <span>Lo???i s???n ph???m</span>
                                    <span>{product.information.type}</span>
                                  </li>
                                  <li>
                                    <span>Ch???t li???u</span>
                                    <span>{product.information.material}</span>
                                  </li>
                                  <li>
                                    <span>Hoa v??n, chi ti???t</span>
                                    <span>{product.information.pattern}</span>
                                  </li>
                                  <li>
                                    <span>K??ch th?????c (d??i x r???ng x cao)</span>
                                    <span>{product.information.Dimensions}</span>
                                  </li>
                                  <li>
                                    <span>Ch???t li???u d??y ??eo</span>
                                    <span>{product.information.strap_material}</span>
                                  </li>
                                  <li>
                                    <span>Chi???u d??i d??y ??eo</span>
                                    <span>{product.information.pattern}</span>
                                  </li>
                                  <li>
                                    <span>Ki???u kh??a</span>
                                    <span>{product.information.lock_type}</span>
                                  </li>
                                  <li>
                                    <span>S??? ng??n</span>
                                    <span>{product.information.compartment}</span>
                                  </li>
                                  <li>
                                    <span>K??ch c???</span>
                                    <span>{product.information.size}</span>
                                  </li>
                                  <li>
                                    <span>Ph?? h???p s??? d???ng</span>
                                    <span>{product.information.suitable}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className={idTab === 2 ? 'body-ct' : 'body-ct hide'}>
                                <div>
                                  <img src={ImageHDBQ} alt="" />
                                </div>
                              </div>
                            </div>
                          ) : product.categoryId === 3 ? (
                            <div className="body">
                              <div className={idTab === 1 ? 'body-ct' : 'body-ct hide'}>
                                <ul className="list-oppr">
                                  <li>
                                    <span>M?? s???n ph???m</span>
                                    <span>{product.information.model}</span>
                                  </li>
                                  <li>
                                    <span>Lo???i s???n ph???m</span>
                                    <span>{product.information.type}</span>
                                  </li>
                                  <li>
                                    <span>K??ch th?????c (d??i x r???ng x cao)</span>
                                    <span>{product.information.Dimensions}</span>
                                  </li>
                                  <li>
                                    <span>Ch???t li???u d??y ??eo</span>
                                    <span>{product.information.strap_material}</span>
                                  </li>
                                  <li>
                                    <span>Ki???u kh??a</span>
                                    <span>{product.information.lock_type}</span>
                                  </li>
                                  <li>
                                    <span>S??? ng??n</span>
                                    <span>{product.information.compartment}</span>
                                  </li>
                                  <li>
                                    <span>K??ch c???</span>
                                    <span>{product.information.size}</span>
                                  </li>
                                  <li>
                                    <span>Ph?? h???p s??? d???ng</span>
                                    <span>{product.information.suitable}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className={idTab === 2 ? 'body-ct' : 'body-ct hide'}>
                                <div>
                                  <img src={ImageHDBQ} alt="" />
                                </div>
                              </div>
                            </div>
                          ) : product.categoryId === 5 && product.type === 'belt' ? (
                            <div className="body">
                              <div className={idTab === 1 ? 'body-ct' : 'body-ct hide'}>
                                <ul className="list-oppr">
                                  <li>
                                    <span>M?? s???n ph???m</span>
                                    <span>{product.information.model}</span>
                                  </li>
                                  <li>
                                    <span>Lo???i s???n ph???m</span>
                                    <span>{product.information.type}</span>
                                  </li>
                                  <li>
                                    <span>Ch???t li???u d??y ??eo</span>
                                    <span>{product.information.strap_material}</span>
                                  </li>
                                  <li>
                                    <span>B???n d??y</span>
                                    <span>{product.information.with}</span>
                                  </li>
                                  <li>
                                    <span>Chi???u d??i</span>
                                    <span>{product.information.length}</span>
                                  </li>
                                </ul>
                              </div>
                              {product.type === 'belt' || (
                                <div className={idTab === 2 ? 'body-ct' : 'body-ct hide'}>
                                  <div>
                                    <img src={ImageHDBQ} alt="" />
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : product.categoryId === 5 && product.type === 'glass' ? (
                            <div className="body">
                              <div className={idTab === 1 ? 'body-ct' : 'body-ct hide'}>
                                <ul className="list-oppr">
                                  <li>
                                    <span>M?? s???n ph???m</span>
                                    <span>{product.information.model}</span>
                                  </li>
                                  <li>
                                    <span>Lo???i s???n ph???m</span>
                                    <span>{product.information.type}</span>
                                  </li>
                                  <li>
                                    <span>Ch???t li???u g???ng k??nh</span>
                                    <span>{product.information.strap_material}</span>
                                  </li>
                                  <li>
                                    <span>C??ng ngh??? tr??ng k??nh</span>
                                    <span>{product.information.lenses}</span>
                                  </li>
                                  <li>
                                    <span>Ki???u k??nh</span>
                                    <span>{product.information.glasses}</span>
                                  </li>
                                  <li>
                                    <span>Ki???u khu??n m???t ph?? h???p</span>
                                    <span>{product.information.suitableFace}</span>
                                  </li>
                                </ul>
                              </div>
                              {product.type === 'glass' || (
                                <div className={idTab === 2 ? 'body-ct' : 'body-ct hide'}>
                                  <div>
                                    <img src={ImageHDBQ} alt="" />
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ListingProduct
              ArrayProduct={productSames}
              titleBlock={'S???n ph???m xem c??ng'}
              booleanSlide={true}
              btnViewAll={false}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;
