import * as React from 'react';
import './Checkout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CustomSelectCities from 'components/customSelect/CustomSelectCities';
import local from '../../apiInforCountry/local.json';
import { City, District, Ward } from 'types/type.address';
import CustomSelectDistricts from 'components/customSelect/CustomSelectDistricts';
import CustomSelectWards from 'components/customSelect/CustomSelectWards';
import CustomSelectCode from 'components/customSelect/CustomSelectCode';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CartBeforLogin, totalProductSelector, UsersSelector } from 'app/selectors';
import { numberWithCommas } from 'utils/numberCommas/numberCommas';
import { checkValueAddress, checkValueLogin } from 'utils/checkValueOfCheckout/CheckValue';
import { fetchAsyncUsers, removeUsers } from 'app/userSlice/userSlice';
interface CheckoutPageProps {}
interface Payment {
  id: string;
  name: string;
  value: number;
}
export interface valueLogin {
  emOrPhone: string;
  password: string;
  phoneNumberOrEm: string;
}
export interface valueAddress {
  username: string;
  phoneNumber: string;
  city: string;
  district: string;
  ward: string;
  textAddress: string;
}
export interface userLogin {
  type: number;
  emOrPhone: string;
  password: string;
}
export interface errorValue {
  typeError: number;
  textError: string;
}

const CheckoutPage: React.FunctionComponent<CheckoutPageProps> = (props) => {
  const Payments: Payment[] = [
    { id: 'payment1', name: 'Thanh toán khi nhận hàng', value: 0 },
    { id: 'payment2', name: 'Thẻ ATM nội địa', value: 1 },
    { id: 'payment3', name: 'Thẻ thanh toán quốc tế (VISA, Master, JCB)', value: 2 },
    { id: 'payment4', name: 'Thanh toán qua ví VNPAY', value: 3 },
    { id: 'payment5', name: 'Thanh toán qua ví MOMO', value: 4 },
    { id: 'payment6', name: 'Thanh toán qua ví ZALOPAY', value: 5 },
    { id: 'payment7', name: 'Thanh toán qua ví SHOPEEPAY', value: 6 },
  ];

  const [cities, setCities] = React.useState<City[]>([] as City[]);

  const [city, setCity] = React.useState<City>({} as City);
  const [district, setDistrict] = React.useState<District>({} as District);
  const [ward, setWard] = React.useState<Ward>({} as Ward);
  const [typeLogin, setTypeLogin] = React.useState<number>(1);
  const [userLogin, setUserLogin] = React.useState<userLogin>({} as userLogin);
  const [transport, setTransport] = React.useState<number>(0);
  const [typePayment, setTypePayment] = React.useState<number>(0);
  const [checkoutBrumb, setCheckoutBrumb] = React.useState<Array<number>>([1]);
  const [error, setError] = React.useState<errorValue>({} as errorValue);
  const [step1, setStep1] = React.useState<string>('');
  const [step2, setStep2] = React.useState<string>('');
  const cart = useAppSelector(CartBeforLogin);
  const totalIn = useAppSelector(totalProductSelector);
  const users = useAppSelector(UsersSelector);
  const dispatch = useAppDispatch();
  const [formLoginValues, setFormLoginValues] = React.useState<valueLogin>({} as valueLogin);
  const [formAddressValues, setFormAddressValues] = React.useState<valueAddress>(
    {} as valueAddress
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormLoginValues({ ...formLoginValues, [name]: value });
  };
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormAddressValues({ ...formAddressValues, [name]: value });
  };
  const handleChangeAddressText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormAddressValues({ ...formAddressValues, [name]: value });
  };
  const handleLogin = () => {
    checkValueLogin(
      error,
      setError,
      typeLogin,
      formLoginValues,
      userLogin,
      setUserLogin,
      users,
      setStep1,
      checkoutBrumb
    );
  };

  const handleAddress = () => {
    checkValueAddress(error, setError, formAddressValues, setStep2);
  };

  React.useEffect(() => {
    if (step1) {
      return setCheckoutBrumb([1, 2]);
    } else {
      return setCheckoutBrumb([1]);
    }
  }, [step1]);
  React.useEffect(() => {
    if (step2) {
      setCheckoutBrumb([1, 2, 3]);
    }
  }, [step2]);
  React.useEffect(() => {
    setFormAddressValues({
      ...formAddressValues,
      city: city.name,
      district: district.name,
      ward: ward.name,
    });
  }, [city, district, ward]);
  React.useEffect(() => {
    dispatch(fetchAsyncUsers());
    return () => {
      dispatch(removeUsers([]));
    };
  }, [dispatch]);
  React.useEffect(() => {
    setCities(local);
  }, []);
  return (
    <div className="checkout-page">
      <div className="header-page">
        <div className="container">
          <div className="row">
            <div className="c-12">
              <div className="breadcrumb">
                <ul>
                  <li className="active">Đăng nhập</li>
                  <FontAwesomeIcon icon={faChevronRight} className="icon-chevron" />
                  <li
                    className={
                      checkoutBrumb[1] === 2 ? 'chkout-br-address active' : 'chkout-br-address '
                    }
                  >
                    Địa chỉ
                  </li>
                  <FontAwesomeIcon icon={faChevronRight} className="icon-chevron" />
                  <li
                    className={checkoutBrumb[2] === 3 ? 'chkout-br-pay active' : 'chkout-br-pay '}
                  >
                    Thanh toán
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className="checkout">
          <div className="container">
            <div className="row">
              <div className="c-12">
                <div className="hotline">
                  <div className="t-hotline">Gọi 1900 0000 để đặt hàng nhanh</div>
                </div>
                <form>
                  <div
                    className={
                      step1 ? ' title-step step1-title ol-active' : 'title-step step1-title active'
                    }
                  >
                    <span>Đăng nhập</span>
                  </div>
                  {step1 ? (
                    <div className="ol-step step1-completed">
                      Bạn đã đăng nhập bằng: <span className="step1-completed-ct">{step1}</span>
                      &nbsp;&nbsp;&nbsp;
                      <Link to="#" className="edit chkout-pre-1" onClick={() => setStep1('')}>
                        Thay đổi
                      </Link>
                    </div>
                  ) : (
                    <div className="step1">
                      <div className="step-content">
                        <div
                          className={
                            error.typeError === 1 && error.textError
                              ? 'notication error notication-step1'
                              : ' notication error notication-step1 no-active'
                          }
                        >
                          <div className="ct-noti">{error.textError}</div>
                          <span
                            className="chkout-close-notication"
                            onClick={() => setError({ ...error, textError: '' })}
                          ></span>
                        </div>
                        <div className="ct-step">
                          <div className="radio-ls">
                            <div>
                              <input
                                id="olduser"
                                type="radio"
                                name="loginornot"
                                value="1"
                                checked={typeLogin === 1 ? true : false}
                                onClick={() => setTypeLogin(1)}
                              />
                              <label>ĐĂNG NHẬP TÀI KHOẢN TẠI VASCARA.COM</label>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <div className="label">Email / Số điện thoại</div>
                              <input
                                type="text"
                                name="emOrPhone"
                                className="user"
                                onChange={handleChange}
                                value={formLoginValues.emOrPhone}
                              />
                            </div>
                            <div className="input-group">
                              <div className="label">Mật khẩu</div>
                              <input
                                type="password"
                                name="password"
                                className="pass"
                                onChange={handleChange}
                                value={formLoginValues.password}
                              />
                            </div>
                            <ul className="rd-link">
                              <li>
                                <Link to={'/forgotpass'} className="chkout-login-forgot-pass">
                                  Bạn quên mật khẩu?
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="radio-ls">
                            <div>
                              <input
                                id="newuser"
                                type="radio"
                                name="loginornot"
                                checked={typeLogin === 2 ? true : false}
                                onClick={() => setTypeLogin(2)}
                              />
                              <label>ĐẶT HÀNG KHÔNG CẦN ĐĂNG NHẬP</label>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <div className="label">Email / Số điện thoại</div>
                              <input
                                type="text"
                                name="phoneNumberOrEm"
                                className="user"
                                onChange={handleChange}
                                value={formLoginValues.phoneNumberOrEm}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group" onClick={handleLogin}>
                              <div className="label"> </div>
                              <button type="button" className="submit chkout-btn-login">
                                Tiếp tục
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className={
                      checkoutBrumb[1] === 2 && !step2
                        ? 'title-step step2-title active'
                        : 'title-step step2-title ol-active'
                    }
                  >
                    <span>Địa chỉ</span>
                  </div>
                  {checkoutBrumb[1] === 2 && (
                    <div>
                      {step2 ? (
                        <div className="ol-step step2-completed">
                          Bạn đã chọn địa chỉ: <span className="step2-completed-ct">{step2}</span>
                          <Link to="#" className="edit chkout-pre-2" onClick={() => setStep2('')}>
                            Thay đổi{' '}
                          </Link>
                        </div>
                      ) : (
                        <div className="step2">
                          <div
                            className={
                              error.typeError === 2 && error.textError
                                ? 'notication error notication-step2'
                                : ' notication error notication-step2 no-active'
                            }
                          >
                            <div className="ct-noti">{error.textError}</div>
                            <span
                              className="chkout-close-notication"
                              onClick={() => setError({ ...error, textError: '' })}
                            ></span>
                          </div>
                          <div className="group-ct-step chkout-create-new-address">
                            <div className="ct-step">
                              <div className="form-group">
                                <div className="title-form">Thông tin người nhận hàng</div>
                                <div className="input-group">
                                  <div className="label">Họ tên:</div>
                                  <input
                                    type="text"
                                    className="fshippingfullname"
                                    name="username"
                                    onChange={handleChangeAddress}
                                  />
                                </div>
                                <div className="input-group">
                                  <div className="label">Số điện thoại:</div>
                                  <input
                                    type="text"
                                    className="fshippingphone"
                                    name="phoneNumber"
                                    placeholder="Vascara sẽ liên hệ SĐT này khi đến giao hàng"
                                    onChange={handleChangeAddress}
                                  />
                                </div>
                                <div className="input-group">
                                  <div className="label">Tỉnh / Thành phố:</div>
                                  <div className="cus-select">
                                    <CustomSelectCities
                                      dataCities={cities}
                                      passValue={(city) => setCity(city)}
                                    />
                                  </div>
                                </div>
                                <div className="input-group">
                                  <div className="label">Quận / Huyện:</div>
                                  <div className="cus-select">
                                    <CustomSelectDistricts
                                      dataDistricts={city.districts}
                                      passValue={(district) => setDistrict(district)}
                                    />
                                  </div>
                                </div>
                                <div className="input-group">
                                  <div className="label">Phường / Xã:</div>
                                  <div className="cus-select">
                                    <CustomSelectWards
                                      dataWards={district.wards}
                                      passValue={(ward) => setWard(ward)}
                                    />
                                  </div>
                                </div>
                                <div className="input-group">
                                  <div className="label">Địa chỉ:</div>
                                  <textarea
                                    className="fshippingaddress"
                                    rows={3}
                                    maxLength={60}
                                    name="textAddress"
                                    placeholder="Vui lòng nhập số nhà, tên đường, tên tòa nhà (nếu có)"
                                    onChange={handleChangeAddressText}
                                  ></textarea>
                                </div>
                              </div>
                              <div className="action-form">
                                <Link
                                  to={'#'}
                                  onClick={handleAddress}
                                  className="booknow chkout-btn-shippingto"
                                >
                                  Giao đến địa chỉ này
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="title-step step3-title ol-active">
                    <span>Thanh toán</span>
                  </div>
                  {checkoutBrumb[2] === 3 && (
                    <div className="step3">
                      <div className="group-left">
                        <div className="shipping">
                          <div className="m-title">chọn gói vận chuyển phù hợp</div>
                          <div className="note-tit">
                            Phí vận chuyển được tính dựa trên trọng lượng kiện hàng, địa điểm nhận
                            hàng
                          </div>
                          <ul className="radio-ls">
                            <li>
                              <input
                                id="ship0"
                                type="radio"
                                className="chkout-shipping-package"
                                name="packgeship"
                                value="JNT"
                                data-region="3"
                                checked={transport === 0 ? true : false}
                                onClick= {() => setTransport(0)}
                              />
                              <label>
                                <span>Nhận hàng trong 1-2 ngày, </span>Giao hàng tiêu chuẩn
                                (J&amp;T): <span className="JNT-lbl-price">16.500 đ</span>
                              </label>
                              <div className="nt-radio">
                                <p></p>
                              </div>
                            </li>
                            <li>
                              <input
                                id="ship1"
                                type="radio"
                                className="chkout-shipping-package"
                                name="packgeship"
                                value="GHTK"
                                checked={transport === 1 ? true : false}
                                onClick= {() => setTransport(1)}
                              />
                              <label>
                                <span>Nhận hàng trong 1-2 ngày, </span>Giao hàng tiêu chuẩn (GHTK):{' '}
                                <span className="GHTK-lbl-price">22.000 đ</span>
                              </label>
                              <div className="nt-radio">
                                <p></p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="payment">
                          <div className="m-title">chọn phương thức thanh toán</div>
                          <div className="payment-banner" style={{ width: '72%' }}></div>{' '}
                          <ul className="radio-ls">
                            {Payments.map((value, index) => (
                              <li key={index}>
                                <input
                                  id={value.id}
                                  type="radio"
                                  name="fpaymentmethod"
                                  value={value.value}
                                  checked={value.value === typePayment && true}
                                  onClick={() => setTypePayment(value.value)}
                                />
                                <label>
                                  <span>{value.name}</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="note-order">
                          <div className="m-title">Ghi chú</div>
                          <textarea
                            name="fnote"
                            cols={30}
                            rows={4}
                            placeholder="Để lại lời nhắn cho Vasara"
                          ></textarea>
                        </div>
                        <button type="button" className="buy chkout-btn-buy">
                          ĐẶT MUA
                        </button>
                      </div>
                      <div className="group-right">
                        <div className="ct-right">
                          <div className="list-product-cart">
                            {cart &&
                              cart.map((value, index) => (
                                <div className="item " key={index}>
                                  <div className="avatar">
                                    <img src={value.img[0]} alt={value.name} />
                                  </div>
                                  <div className="info">
                                    <div className="product-title">{value.name}</div>
                                    <div className="">
                                      <i>
                                        Màu: {value.color}
                                        {value.size && `, size: ${value.size}`}
                                      </i>
                                    </div>
                                    <div className="number">Số lượng: {value.quantity}</div>
                                    <span className={value.priceOff ? 'price sale' : 'price'}>
                                      Giá:{' '}
                                      <ins>
                                        <span className="amount">
                                          {numberWithCommas(value.priceMain)}
                                        </span>
                                        <span className="currency">đ</span>
                                      </ins>
                                      {value.priceOff ? (
                                        <del>
                                          <span className="amount">
                                            {numberWithCommas(value.price)}
                                          </span>
                                          <span className="currency">đ</span>
                                        </del>
                                      ) : (
                                        ''
                                      )}
                                    </span>
                                    <div className="total-price">
                                      TỔNG: {numberWithCommas(value.totalPrice)} đ
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                          <div className="group-coupon">
                            <div className="coupon">
                              <div className="title-coupon">* Nhập số điện thoại VIP (Nếu có)</div>
                              <div className="apply-coupon lbl-applyvip ">
                                <input
                                  type="text"
                                  name="vipcode"
                                  placeholder="Nhập số điện thoại VIP"
                                />
                                <div className="apply-btn">
                                  <a
                                    href="javascript:void(0)"
                                    className="apply chkout-btn-applyvip"
                                  >
                                    Áp dụng
                                  </a>
                                </div>
                              </div>
                              <div className="apply-success lbl-applyvip-sh hide">
                                <div className="ct-apply">
                                  <span className="lbl-applyvip-mess"></span>
                                  {/* <span className="warning">
                                  * Chỉ áp dụng cho các sản phẩm nguyên giá hoặc 1 số sản phẩm sale
                                </span> */}
                                </div>
                                <span className="close remove-applyvip"></span>
                              </div>
                            </div>
                            <div className="coupon">
                              <div className="title-coupon">
                                Nhập mã giảm giá (Coupon), chỉ sử dụng 1 mã cho 1 đơn hàng
                                <div className="icon-guide">
                                  <i className="fa fa-exclamation-circle"></i>
                                </div>
                                {/* <div className="group-guide">
                                <div className="content-guide">
                                  Mã giảm giá Coupon: Là mã giảm giá được Vascara phát hành theo một
                                  sự kiện/chương trình. Có điều kiện sử dụng.
                                </div>
                              </div> */}
                              </div>
                              <div className="apply-coupon lbl-applycoupon ">
                                <input
                                  type="text"
                                  name="couponcode"
                                  placeholder="Nhập mã giảm giá (nếu có)"
                                />
                                <div className="apply-btn">
                                  <Link to={'#'} className="apply chkout-btn-applycoupon">
                                    Áp dụng
                                  </Link>
                                </div>
                              </div>
                              <div className="apply-success lbl-applycoupon-sh hide">
                                <div className="ct-apply">
                                  <span className="lbl-applycoupon-mess"></span>
                                </div>
                                <span className="close remove-applycoupon"></span>
                              </div>
                            </div>
                            <div className="coupon">
                              <div className="title-coupon">
                                Nhập mã giảm giá (Gift card/ Voucher) có thể sử dụng nhiều mã cách
                                nhau dấu phẩy ","
                                <div className="icon-guide">
                                  <i className="fa fa-exclamation-circle"></i>
                                </div>
                                {/* <div className="group-guide">
                                <div className="content-guide">
                                  Mã giảm giá Coupon: Là mã giảm giá được Vascara phát hành theo một
                                  sự kiện/chương trình. Có điều kiện sử dụng.
                                </div>
                              </div> */}
                              </div>
                              <div className="lbl-applygiftcard ">
                                <div className="cus-select">
                                  <CustomSelectCode />
                                </div>
                                <div className="apply-coupon">
                                  <input
                                    type="text"
                                    name="giftcardcode"
                                    placeholder="Mã giảm giá 1, mã giảm giá 2,..."
                                  />
                                  <div className="apply-btn">
                                    <Link to={'#'} className="apply chkout-btn-applygiftcard">
                                      Áp dụng
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="apply-success lbl-applygiftcard-sh hide">
                                <div className="ct-apply">
                                  <span className="lbl-applygiftcard-mess"></span>
                                </div>
                                <span className="close remove-applygiftcard"></span>
                              </div>
                            </div>
                          </div>
                          <div className="group-price">
                            <div className="number-product">
                              <div className="label">Tổng số lượng:</div>
                              <div className="value">{totalIn.totalQuantity}</div>
                            </div>
                            <div className="total-price">
                              <div className="label">Tạm tính:</div>
                              <div className="value lbl-sellingprice" data-vl="2554400">
                                {numberWithCommas(totalIn.totalAmount)} đ
                              </div>
                            </div>
                            <div className="shipping-total">
                              <div className="label">Phí vận chuyển:</div>
                              <div className="value lbl-shippingprice" data-vl="0">
                                <span style={{ color: '#ee4950' }}>
                                  <i>miễn phí</i>
                                </span>
                              </div>
                            </div>
                            <div className="discount-price">
                              <div className="label">Giảm tiền:</div>
                              <div className="value">
                                <span className="lbl-discountbill" data-vl="0">
                                  0
                                </span>{' '}
                                đ
                              </div>
                            </div>

                            <div className="final-price">
                              <div className="label">Thành tiền:</div>
                              <div className="value">
                                <span
                                  className="lbl-finalprice"
                                  data-vl="2554400"
                                  style={{ fontWeight: 'bold' }}
                                >
                                  {numberWithCommas(totalIn.totalAmount)}
                                </span>{' '}
                                đ
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
