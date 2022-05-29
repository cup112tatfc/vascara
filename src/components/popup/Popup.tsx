import * as React from 'react';
import { Link } from 'react-router-dom';
import './Popup.scss';
import { numberWithCommas } from '../../utils/numberCommas/numberCommas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CartBeforLogin, totalProductSelector } from 'app/selectors';
import { DeleteProduct } from 'app/cartSlice/cartSlice';
import LoadingPopup from 'components/loadingPopup/LoadingPopup';
import { is } from 'immer/dist/internal';
interface PopupProps {
  isOpen: boolean;
  closeOpen: (e: boolean) => any;
}

const Popup: React.FunctionComponent<PopupProps> = (props) => {
  const getCart = useAppSelector(CartBeforLogin);
  const total = useAppSelector(totalProductSelector);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (props.isOpen) {
      setLoading(true);
      setTimeout(() => setLoading(false), 800);
      setTimeout(() => setShowPopup(true), 800);
    } else {
      setLoading(false);
      setShowPopup(false);
    }
  }, [props.isOpen]);
  return (
    <div>
      <LoadingPopup LoadingBoolean={loading} />
      <div className={showPopup ? 'popup-add' : 'popup-add no-active'}>
        <div className="content-popup">
          <div className="title-popup">
            Thông tin giỏ hàng
            <div className="close" onClick={() => props.closeOpen(false)}>
              <span></span>
            </div>
          </div>
          <div className="ct-popup">
            <div className="table-product">
              <ul className="bartable">
                <li>Thông tin sản phẩm</li>
                <li>Tùy chọn của bạn</li>
                <li>Giá</li>
              </ul>
              <ul className="list-cart">
                {getCart &&
                  getCart.map((value, index) => (
                    <li className="cart-item" key={index}>
                      <div className="col-p1">
                        <img src={value.img[0]} alt="" className="avatar" />
                        <div className="info-item">
                          <h3 className="title-item">{value.name}</h3>
                          <span className="price">
                            <ins>
                              <span className="amount">{numberWithCommas(value.priceMain)} đ</span>
                            </ins>
                          </span>
                        </div>
                      </div>
                      <div className="col-p2">
                        <label>
                          <span>Màu:&nbsp;</span>
                          <strong>{value.color}</strong>
                        </label>
                        {value.size && (
                          <label>
                            <span>Size:&nbsp;</span>
                            <strong>{value.size}</strong>
                          </label>
                        )}
                      </div>
                      <div className="col-p3">
                        <label>
                          <span className="padd">Số lượng:</span>
                          <strong>{value.quantity}</strong>
                        </label>
                        <label>
                          <span>Tổng:&nbsp;&nbsp;</span>
                          <strong>
                            {value.totalPrice && numberWithCommas(value.totalPrice)} đ
                          </strong>
                        </label>
                      </div>
                      <div className="col-del">
                        <button
                          className="removeitem"
                          onClick={() => dispatch(DeleteProduct(value))}
                        >
                          Xóa
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="final-cart">
              <div className="left">
                <div className="item-promotion fgift">
                  <span style={{ color: '#FF0000' }}>
                    <strong>MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC CHO ĐƠN HÀNG TỪ 0Đ.</strong>
                  </span>
                </div>

                <div className="item-promotion fgift">
                  <span style={{ color: '#FF0000' }}>
                    <strong>
                      MUA 2 GIẢM 10%, MUA 3 GIẢM 15% (GIẢM THÊM 10% - 15% KHI ÁP DỤNG VIP).
                    </strong>
                  </span>
                </div>
              </div>
              <div className="right">
                <div className="total-price">
                  Tổng cộng:
                  <span className="pptotal-price">
                    {total.totalAmount && numberWithCommas(total.totalAmount)} đ
                  </span>
                </div>
                <div className="note-cart">
                  Coupon, VIP, Phí vận chuyển sẽ được áp dụng ở trang thanh toán.
                </div>
              </div>
            </div>
            <div className="action-cart">
              <button className="next-discover" onClick={() => props.closeOpen(false)}>
                Tiếp tục khám phá
                <i className="">
                  <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>
                </i>
              </button>
              <button className="next-checkout">
                <Link to={'/cart/checkout'}>
                  Đặt mua ngay<span>(giao hàng tận nơi)</span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Popup;
