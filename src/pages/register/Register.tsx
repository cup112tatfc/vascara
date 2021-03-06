import * as React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';
import Eye from '../../images/eyeshow.png';
import Hieddeneye from '../../images/hiddeneye.png';
import { RegisterDatatype, RegisterErrors } from 'types/type.auth';

import { ValidateAfterBlur } from 'utils/errorsForm/validateAfterBlur';
import { submitForm } from 'utils/submitForm/SubmitForm';
import { checkUserEmailSelector, checkUserPhonenumberSelector } from 'app/selectors';
import {
  fetchAsyncCheckUserEmail,
  fetchAsyncCheckUserPhonenumber,
  fetchRegister,
  getUserAfterLogin,
  setCheckUser,
} from 'app/userSlice/userSlice';
import { fetchAsyncCreateCart } from 'app/cartSlice/cartSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ModalDialog from 'components/modalDialog/ModalDialog';


const Register: React.FunctionComponent = () => {
  const initialValue: RegisterDatatype = {
    email: '',
    phoneNumber: '',
    password: '',
    conFpassword: '',
    username: '',
    id: '',
  };
  const initialValueError: RegisterErrors = {
    email: '',
    phoneNumber: '',
    password: '',
    conFpassword: '',
    username: '',
  };
  const randomId = Math.random().toString(36).slice(2);
  const randomIdCart = Math.random().toString(36).slice(2);
  const [showPass, setShowPass] = React.useState<boolean>(false);
  const [formValues, setFormValues] = React.useState<RegisterDatatype>(initialValue);
  const [formErrors, setFormErrors] = React.useState<RegisterErrors>(initialValueError);
  const [emailExists, setEmailExists] = React.useState<boolean>(false);
  const [phoneExists, setPhoneExists] = React.useState<boolean>(false);
  const [check, setCheck] = React.useState<boolean>(false);
  const [activeModal, setActiveModal] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const userCheckEmail = useAppSelector(checkUserEmailSelector);
  const userCheckPhoneNumber = useAppSelector(checkUserPhonenumberSelector);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    submitForm(
      formValues,
      formErrors,
      setFormErrors,
      userCheckEmail,
      userCheckPhoneNumber,
      setCheck
    );
    setEmailExists(Object.keys(userCheckEmail).length === 0 ? false : true);
    setPhoneExists(Object.keys(userCheckPhoneNumber).length === 0 ? false : true);
  };

  React.useEffect(() => {
    if (check) {
      dispatch(
        fetchRegister({
          id: formValues.id,
          email: formValues.email,
          phoneNumber: formValues.phoneNumber,
          password: formValues.password,
          username: formValues.username,
        })
      );
      dispatch(
        fetchAsyncCreateCart({
          id: randomIdCart,
          categoryId: formValues.id,
          cart: [],
          totalAmount: 0,
          totalQuantity: 0,
        })
      );
      dispatch(
        getUserAfterLogin({
          id: formValues.id,
          email: formValues.email,
          phoneNumber: formValues.phoneNumber,
          password: formValues.password,
          username: formValues.username,
        })
      );
      dispatch(setCheckUser(true));
      setActiveModal(true);
    } else {
      setCheck(false);
    }
  }, [check]);
  React.useEffect(() => {
    dispatch(fetchAsyncCheckUserEmail(formValues.email));
  }, [formValues.email]);
  React.useEffect(() => {
    dispatch(fetchAsyncCheckUserPhonenumber(formValues.phoneNumber));
  }, [formValues.phoneNumber]);

  React.useEffect(() => {
    setFormValues({
      ...formValues,
      id: randomId,
    });
    
  }, []);

  return (
    <div>
      <ModalDialog
        Active={activeModal}
        WordAuth={'????ng k??'}
        CloseBox={(activeModal) => setActiveModal(activeModal)}
      />
      <div className="register">
        <div className="title">????NG K?? TH??NH VI??N</div>
        <div className="group-form">
          <form onSubmit={handleSubmit}>
            {(emailExists || phoneExists) && (
              <div className="alert alert-danger">
                <span
                  className="close"
                  data-dismiss="alert"
                  aria-label="close"
                  onClick={() => {
                    setEmailExists(false);
                    setPhoneExists(false);
                  }}
                >
                  ??
                </span>
                <div className="msg_wrapper">
                  {emailExists && (
                    <span>
                      Email ???? ???????c ????ng k??, vui l??ng ki???m tra l???i, n???u qu??n m???t kh???u vui l??ng nh???n
                      v??o ????y ?????{' '}
                      <em>
                        <Link to={'/forgotpass'}>t??m l???i m???t kh???u</Link>
                      </em>{' '}
                      <br />
                    </span>
                  )}
                  {phoneExists && (
                    <span>
                      S??? ??i???n tho???i ???? t???n t???i trong h??? th???ng. <br />
                    </span>
                  )}
                </div>
              </div>
            )}
            <div className="form-group">
              <label>Email c???a b???n</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control txt_login"
                value={formValues.email}
                onChange={handleChange}
                onBlur={() =>
                  ValidateAfterBlur('email', formValues.email, formErrors, setFormErrors)
                }
              />
              <div className="error error-email">{formErrors.email}</div>
            </div>
            <div className="form-group">
              <label>??i???n tho???i</label>
              <input
                autoComplete="off"
                type="text"
                name="phoneNumber"
                placeholder="S??? ??i???n tho???i"
                className="form-control txt_login"
                maxLength={10}
                value={formValues.phoneNumber}
                onChange={handleChange}
                onBlur={() =>
                  ValidateAfterBlur(
                    'phoneNumber',
                    formValues.phoneNumber,
                    formErrors,
                    setFormErrors
                  )
                }
              />
              <div className="error error-phone">{formErrors.phoneNumber}</div>
            </div>
            <div className="form-group">
              <label>M???t kh???u c???a b???n</label>
              <input
                autoComplete="off"
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="M???t kh???u"
                className="form-control txt_login"
                value={formValues.password}
                onChange={handleChange}
                onBlur={() =>
                  ValidateAfterBlur('password', formValues.password, formErrors, setFormErrors)
                }
              />
              <i className="btn-showpass" onClick={() => setShowPass(!showPass)}>
                {showPass ? <img src={Hieddeneye} alt="" /> : <img src={Eye} alt="" />}
              </i>
              <div className="error error-password">{formErrors.password}</div>
            </div>
            <div className="form-group">
              <label>X??c nh???n m???t kh???u</label>
              <input
                autoComplete="off"
                type="password"
                name="conFpassword"
                placeholder="Nh???p l???i m???t kh???u"
                className="form-control txt_login"
                value={formValues.conFpassword}
                onChange={handleChange}
                onBlur={() =>
                  ValidateAfterBlur(
                    'conFpassword',
                    formValues.conFpassword,
                    formErrors,
                    setFormErrors,
                    formValues.password
                  )
                }
              />
              <div className="error error-confPassword">{formErrors.conFpassword}</div>
            </div>
            <div className="form-group">
              <label>H??? v?? T??n</label>
              <input
                autoComplete="off"
                type="text"
                name="username"
                placeholder="Vui l??ng nh???p ti???ng Vi???t c?? d???u"
                className="form-control txt_login"
                value={formValues.username}
                onChange={handleChange}
                onBlur={() =>
                  ValidateAfterBlur('username', formValues.username, formErrors, setFormErrors)
                }
              />
              <div className="error error-fullname">{formErrors.username}</div>
            </div>
            <p>
              B???ng c??ch b???m n??t "????ng k??" b??n d?????i, b???n ???? x??c nh???n ?????ng ?? v???i
              <a href="/chinh-sach-bao-mat" target="_blank">
                {' '}
                ??i???u kho???n s??? d???ng th??ng tin
              </a>{' '}
              c???a vascara.com
            </p>
            <button className="btn btn-default btn_login btn-register" type="submit">
              ????NG K??
            </button>
            <div className="more-link">
              <Link to="/login">????ng nh???p</Link>
              <Link to="/forgotpass">Qu??n m???t kh???u</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
