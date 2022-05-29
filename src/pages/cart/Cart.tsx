import * as React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import './Cart.scss';
import {
  CartBeforLogin,
  checkUserSelector,
  totalProductSelector,
  userSelector,
} from 'app/selectors';
import {
  IncreasequatityProduct,
  DecreasequatityProduct,
  DeleteProduct,
  fetchAsyncGetCart,
} from 'app/cartSlice/cartSlice';
import { numberWithCommas } from 'utils/numberCommas/numberCommas';
import { ProductOfCart } from 'types/type.cart';
interface CartProps {}

const Cart: React.FunctionComponent<CartProps> = (props) => {
  const dispatch = useAppDispatch();
  const cartBeforLogin = useAppSelector(CartBeforLogin);
  const totalProduct = useAppSelector(totalProductSelector);
  const checkUser = useAppSelector(checkUserSelector);
  const user = useAppSelector(userSelector);
  const createLink: (categoryId: number | string) => void = (categoryId) => {
    let path: string | null;
    if (categoryId === 1) {
      path = 'giay';
    } else if (categoryId === 2) {
      path = 'tui-xach';
    } else if (categoryId === 3) {
      path = 'balo';
    } else if (categoryId === 5) {
      path = 'phu-kien';
    } else path = null;
    return path;
  };

  React.useEffect(() => {
    dispatch(fetchAsyncGetCart(user.id));
  }, [checkUser]);
  return (
    <div>
      <div className="container">
        {Object.keys(cartBeforLogin).length !== 0 ? (
          <div className="cart-page">
            <div className="row">
              <div className="col-xl-12">
                <h1 className="title-page">Giỏ hàng của bạn</h1>
                <div className="cart">
                  <div className="head-cart">
                    <div className="cl-1">Ảnh sản phẩm</div>
                    <div className="cl-2">Tên sản phẩm</div>
                    <div className="cl-3">Đơn giá</div>
                    <div className="cl-4">Số lượng</div>
                    <div className="cl-5">Thành tiền</div>
                    <div className="cl-6">Xóa</div>
                  </div>
                  <div className="body-cart">
                    {cartBeforLogin.map((value, index) => (
                      <div className="item-cart" key={index}>
                        <div className="cl-1">
                          <Link
                            to={`/${createLink(value.categoryId)}/${value.categoryId}/${value.id}`}
                          >
                            <img src={value.img[0]} alt="" />
                          </Link>
                        </div>
                        <div className="cl-2">
                          <div className="info-item">
                            <div className="title-product">{value.name}</div>
                            <ul className="attr">
                              <li>
                                {' '}
                                <span>Màu:</span>
                                {value.color}
                              </li>
                              {value.size && (
                                <li>
                                  <span>Size:</span>
                                  {value.size}
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                        <div className="cl-3">
                          <span className={value.priceOff ? 'price-pro sale' : 'price-pro  '}>
                            <ins>
                              <span className="amount">{numberWithCommas(value.priceMain)}</span>
                              <span className="currency">đ</span>
                            </ins>
                            {value.priceOff ? (
                              <del>
                                <span className="amount">`${numberWithCommas(value.price)}`</span>
                                <span className="currency">đ</span>
                              </del>
                            ) : (
                              ''
                            )}
                          </span>
                        </div>
                        <div className="cl-4">
                          <div className="book-number">
                            <button
                              className={
                                value.quantity === 1
                                  ? 'item-change minus not-allow'
                                  : 'item-change minus'
                              }
                              onClick={() => dispatch(DecreasequatityProduct(value))}
                            >
                              -
                            </button>
                            <div className="input-number">
                              <input className="5779-27854-1012CLU0089" value={value.quantity} />
                            </div>
                            <button
                              className={
                                value.totalQuantity === value.quantity
                                  ? 'item-change plus not-allow'
                                  : 'item-change plus'
                              }
                              onClick={() => dispatch(IncreasequatityProduct(value))}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="cl-5">
                          <span className="">
                            <ins>
                              <span
                                data-price="532700"
                                className="amount sb-5779-27854-1012CLU0089"
                              >
                                {numberWithCommas(value.totalPrice)}
                              </span>
                              <span className="currency">đ</span>
                            </ins>
                          </span>
                        </div>
                        <div className="cl-6">
                          <i onClick={() => dispatch(DeleteProduct(value))}>
                            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                          </i>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cart-button">
                  <div className="row">
                    <div className="c-6 l-12 pd-col">
                      <div className="pp_notify">
                        <div className="item-promotion fgift">
                          <span style={{ color: '#ff529c' }}>
                            <strong>MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC CHO ĐƠN HÀNG TỪ 0Đ.</strong>
                          </span>
                        </div>

                        <div className="item-promotion fgift">
                          <span style={{ color: '#ff529c' }}>
                            <strong>
                              MUA 2 GIẢM 10%, MUA 3 GIẢM 15% (GIẢM THÊM 10% - 15% KHI ÁP DỤNG VIP).
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="c-6 l-12 pd-col">
                      <ul className="total-price">
                        <li>Số lượng</li>
                        <li className="price-cart quantitytotal">
                          {numberWithCommas(totalProduct.totalQuantity)}
                        </li>
                      </ul>
                      <ul className="total-price">
                        <li>Giá trị hàng hóa</li>
                        <li className="price-cart">
                          <span className="amount pricesellingtotal">
                            {numberWithCommas(totalProduct.totalAmount)}
                          </span>
                          <span className="currency">đ</span>
                        </li>
                      </ul>
                      <ul className="total-price">
                        <li>Phí vận chuyển</li>
                        <li className="price-cart">
                          <i>Chưa có</i>
                        </li>
                      </ul>
                      <ul className="total-price">
                        <li>Giảm tiền</li>
                        <li className="price-cart sale">
                          <span className="amount promotiondiscount">0</span>
                          <span className="currency">đ</span>
                        </li>
                      </ul>
                      <ul className="total-price">
                        <li>
                          Thành tiền <span className="vat">(đã bao gồm VAT)</span>
                        </li>
                        <li className="price-cart">
                          <span className="amount pricetotal">
                            {numberWithCommas(totalProduct.totalAmount)}
                          </span>
                          <span className="currency">đ</span>
                        </li>
                      </ul>
                      <button className="checkout-cart">
                        <Link to={'/cart/checkout'}> Tiến hành thanh toán</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="c-12">
              <div className="cart-empty">
                <div className="noti">Hiện tại không có sản phẩm nào trong giỏ hàng của bạn</div>
                <Link to={'/'} className="continue-cart">
                  Tiếp tục mua sắm &gt;&gt;
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
