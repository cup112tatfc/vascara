import * as React from 'react';
import { Link } from 'react-router-dom';
import './Forgotpass.scss';
interface IAppProps {}

const Forgotpass: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div>
      <div className="forgotpass">
        <br />
        <div className="title">Lấy lại mật khẩu</div>
        <div className="group-form">
          <form id="frmforgotpass" method="post">
            <div className="form-group">
              <label>Email của bạn</label>
              <input
                name="femail"
                type="text"
                placeholder="Nhập email bạn đã đăng ký"
                className="form-control txt_login"
              />
              <div className="error error-email hide"></div>
            </div>
            <input type="hidden" name="fsubmit" value="1" />
            <button className="btn btn-default btn_login btn-register" type="submit">
              NHẬN LẠI MẬT KHẨU
            </button>
            <div className="more-link">
              <Link to={"/login"}>Đăng nhập</Link>
              <Link to={"/register"}>Đăng ký</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgotpass;
