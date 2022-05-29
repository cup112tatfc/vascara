import * as React from 'react';
import './HeaderTop.scss';
import logo from '../../../images/logo.png';
import cart from '../../../images/cart.png';
import search from '../../../images/search-v1.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { toggleMenuRes } from 'app/toggleSlice/toggleSlice';
import Avartar from '../../../images/noavatar.png';

import { removeUser } from 'app/userSlice/userSlice';
import { userSelector, checkUserSelector, totalProductSelector } from 'app/selectors';
import { fetchAsyncSearchProduct } from 'app/productSlice/productSlice';

interface HeaderProps {
  handleOpenSearch: (value: boolean) => void;
}

const HeaderTop: React.FunctionComponent<HeaderProps> = (props) => {
  const [showHeadRespon, setShowHeadRespon] = React.useState<boolean>(false);
  const user = useAppSelector(userSelector);
  const checkUser = useAppSelector(checkUserSelector);
  const dispatch = useAppDispatch();
  const totalProduct = useAppSelector(totalProductSelector);
  const [searchText, setSearchText] = React.useState<string>('');
  const handleClick: () => void = () => {
    dispatch(toggleMenuRes(true));
  };
  const navigate = useNavigate();
  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchText('');
    dispatch(fetchAsyncSearchProduct(searchText));
    navigate('/product/search');
  };
  React.useEffect(() => {
    const handleHeader: () => void = () => {
      if (window.scrollY >= 120) {
        setShowHeadRespon(true);
      } else {
        setShowHeadRespon(false);
      }
    };
    window.addEventListener('scroll', handleHeader);
    return () => {
      window.removeEventListener('scroll', handleHeader);
    };
  }, []);
  React.useEffect(()=>{

  },[])
  return (
    <div className={showHeadRespon ? 'header-top active-head' : 'header-top'}>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="menu-inner">
              <div className="btn-showmenu" onClick={handleClick}>
                <span></span>
              </div>
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="search-wrap">
                <form className="search_form" onSubmit={handleSearch}>
                  <input
                    placeholder="Tìm kiếm"
                    className="search_input"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </form>
              </div>
              <div className="tool-right">
                <div className="search-mobi" onClick={() => props.handleOpenSearch(true)}>
                  <img src={search} alt="" />
                </div>
                <div className="profile">
                  {checkUser ? (
                    <div className="logged">
                      <div className="avatar">
                        <img src={Avartar} alt="User Avatar" />
                      </div>
                      <div className="logged-menu">
                        <ul>
                          <li>Xin chào, {user.username}</li>
                          <li>
                            <Link to={'#'}>Thông tin tài khoản</Link>
                          </li>
                          <li onClick={() => dispatch(removeUser(false))}>
                            <Link to={'/login'}>Đăng xuất</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="user_action">
                      <ul>
                        <li>
                          <Link to="/register">
                            <a>Đăng Ký</a>
                          </Link>
                        </li>
                        <li>
                          <Link to="/login">
                            <a>Đăng Nhập</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="cart">
                  <Link to={'/cart'}>
                    <img src={cart} alt="" className="img-cart" />
                    <span className="count">
                      ({totalProduct.totalQuantity ? totalProduct.totalQuantity : 0})
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
