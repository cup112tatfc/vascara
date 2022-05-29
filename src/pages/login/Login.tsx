import * as React from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { UsersSelector } from 'app/selectors';
import { fetchAsyncUsers, getUserAfterLogin, setCheckUser } from 'app/userSlice/userSlice';
import { checkLogin } from 'utils/authLogin/checkLogin';
import { User, userLogin } from 'types/type.auth';
import ModalDialog from 'components/modalDialog/ModalDialog';


export interface NoiNoUser {
  check: boolean;
  text: string;
}
const Login: React.FunctionComponent = () => {
  const initialValue: userLogin = {
    emOrPhone: '',
    password: '',
  };
  const noiNoUser: NoiNoUser = {
    check: false,
    text: '',
  };
  const user: User = {
    id: '',
    email: '',
    password: '',
    phoneNumber: '',
    username: '',
  };
  const [showNoiNouser, setShowNoiNouser] = React.useState<NoiNoUser>(noiNoUser);
  const [checkTokenName, setCheckTokenName] = React.useState<boolean>(false);
  const [formValues, setFormValues] = React.useState<userLogin>(initialValue);
  const [successLogin, setSuccessLogin] = React.useState<boolean>(false);
  const [errorEmorPhone, setErrorEmorPhone] = React.useState<string>('');
  const [errorPass, setErrorPass] = React.useState<string>('');
  const [getuser, setGetUser] = React.useState<User>(user);
  const [activeModal, setActiveModal] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const users = useAppSelector(UsersSelector);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleCheck = (e: string, value: any) => {
    checkLogin(
      value,
      users,
      e,
      setCheckTokenName,
      setShowNoiNouser,
      showNoiNouser,
      setErrorEmorPhone,
      setErrorPass,
      setSuccessLogin,
      setGetUser
    );
  };
  const hanldleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCheck('emOrPhone', formValues.emOrPhone);
    } else {
    }
  };
  const hanldleKeyDownPass = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCheck('passwprd', formValues.password);
    } else {
    }
  };

  React.useEffect(() => {
    dispatch(fetchAsyncUsers());
  }, [dispatch]);
  React.useEffect(() => {
    if (successLogin) {
      dispatch(getUserAfterLogin(getuser));
      dispatch(setCheckUser(true));
      setActiveModal(true);
    }
  }, [successLogin]);

  return (
    <div>
      <ModalDialog
        Active={activeModal}
        WordAuth={'đăng nhập'}
        CloseBox={(activeModal) => setActiveModal(activeModal)}
      />
      <div className="signup">
        <div className="container">
          <div className="flex-wrap">
            <div className="msform">
              <div className="title-login">Đăng nhập</div>
              <div
                className="form-login pe-user"
                style={
                  showNoiNouser.check || checkTokenName
                    ? {
                        transform: 'scale(0.8)',
                        position: 'absolute',
                        opacity: 0,
                        visibility: 'hidden',
                      }
                    : {
                        transform: 'scale(1)',
                        position: 'absolute',
                        opacity: 1,
                        visibility: 'visible',
                      }
                }
              >
                <h3 className="fs-title">Email hoặc số điện thoại</h3>
                <div id="error-step1" className="error hide">
                  {errorEmorPhone}
                </div>
                <input
                  name="emOrPhone"
                  value={formValues.emOrPhone}
                  className="emailphone"
                  placeholder="Nhập Email hoặc Số điện thoại"
                  onChange={handleChange}
                  onKeyDown={hanldleKeyDown}
                ></input>
                <input
                  type="button"
                  name="next"
                  value="Tiếp tục"
                  className="next action-button"
                  onClick={() => handleCheck('emOrPhone', formValues.emOrPhone)}
                ></input>
                <div className="other-login">
                  <div className="">Hoặc đăng nhập bằng...</div>
                  <div className="f-p-v login-w-f">
                    <Link to={'#'} className="btn btn-default btn_login ">
                      <span>Facebook</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="form-login notification-nouser"
                style={
                  showNoiNouser.check || checkTokenName
                    ? {
                        maxWidth: '500px',
                        margin: '0px auto',
                        border: '1px solid',
                        textAlign: 'center',
                        visibility: 'visible',
                        paddingTop: '35px',
                        left: 0,
                        opacity: 1,
                        position: 'relative',
                        display: 'block',
                      }
                    : {
                        maxWidth: '500px',
                        margin: '0px auto',
                        border: '1px solid',
                        textAlign: 'center',
                        visibility: 'hidden',
                        paddingTop: '35px',
                        left: '50%',
                        opacity: 0,
                        position: 'relative',
                      }
                }
              >
                <h2 className="fs-title">Chào mừng</h2>
                <h3 className="fs-subtitle emailinput">{showNoiNouser.text}</h3>
                {showNoiNouser.check && (
                  <div className="nouser">
                    <div className="noshopping">
                      <h5>
                        Chúng tôi nhận thấy{' '}
                        <span className="emailorphone">{showNoiNouser.text}</span> chưa phải là
                        thành viên của Vascara.com. Để trở thành thành viên, bấm nút "Đăng ký nhanh"
                        bên dưới và tiếp tục làm theo hướng dẫn để được:
                      </h5>
                      <p> - Là người đầu tiên nhận thông tin khuyến mãi từ Vascara</p>
                      <p> - Mua hàng nhanh, tích lũy điểm khi mua hàng online</p>
                      <p> - Cùng nhiều ưu đãi khác</p>
                      <div>
                        <Link to={'/register'} type="button" id="lnk_register" className="button">
                          Đăng ký nhanh
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                {checkTokenName && (
                  <div className="login-password">
                    <div id="error-step1" className="error hide">
                      {errorPass}
                    </div>
                    <input
                      value={formValues.password}
                      name="password"
                      id="pwemail"
                      className="password"
                      type="password"
                      placeholder="Nhập mật khẩu"
                      onKeyDown={hanldleKeyDownPass}
                      onChange={handleChange}
                    />
                    <input
                      type="submit"
                      name="submit"
                      value="Đăng nhập"
                      className="submit action-button"
                      onClick={() => handleCheck('password', formValues.password)}
                    />
                    <p>
                      <Link to={'/forgotpass'}>Quên mật khẩu</Link>
                    </p>
                  </div>
                )}
                <input
                  type="button"
                  name="previous"
                  value="Quay lại"
                  className="btn previous back-button"
                  onClick={() =>
                    showNoiNouser.check
                      ? setShowNoiNouser(() => ({ ...showNoiNouser, check: false }))
                      : checkTokenName
                      ? setCheckTokenName(false)
                      : true
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
