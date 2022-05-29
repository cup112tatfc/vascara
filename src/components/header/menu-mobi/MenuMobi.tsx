import * as React from 'react';
import { Link } from 'react-router-dom';
import { ListMenu } from '../data-menu';
import IconClose from '../../../images/close1.png';
import avatar from '../../../images/noavatar.png';
import SubMenuMobi from './SubMenu';
import './MenuMobi.scss';
import { useAppSelector } from 'app/hooks';
import { useAppDispatch } from 'app/hooks';
import { toggleMenuRes } from 'app/toggleSlice/toggleSlice';
import { menuToggleResSelector } from 'app/selectors';

const MenuMobi: React.FunctionComponent = () => {

  const toggle = useAppSelector(menuToggleResSelector);
  const dispatch = useAppDispatch();
  const handleClick :() => void = () =>{
    dispatch(toggleMenuRes(false))
  }
  React.useEffect(() =>{

  },[toggle])
  return (
    
      <div className={toggle ? "main-menu-mobi show" : "main-menu-mobi"}>
        <div className="main-menu-top">
          <div className="close" onClick={handleClick}>
            <img src={IconClose} alt="" />
          </div>
          <div className="profile-menu">
            <ul>
              <li className="avatar">
                <img src={avatar} alt="" />
              </li>
            </ul>
          </div>
        </div>
        <div className="menu-mobi">
          <div className="container">
            <div className="row">
              <div className="col">
                <nav className="menu-mobi_hero">
                  <div className="menu-mobi_list">
                    {ListMenu.map((item, index) => (
                      <SubMenuMobi data={item} key={index} />
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="main-menu-bottom">
          <ul>
            <li>
              <Link to="/register">Đăng ký</Link>
            </li>
            <li>
              <Link to="login">Đăng nhập</Link>
            </li>
          </ul>
        </div>
      </div>
   
  );
};

export default MenuMobi;
