import * as React from 'react';
import './Footer.scss';
import Bct from '../../images/bct.png';
import Fb  from '../../images/facebook.png';
import Instar from '../../images/instagram.png';
import Zalo from '../../images/zalo.png';


const Footer: React.FunctionComponent = () => {
  return(
      <div className="footer">
        <div className="main-footer">
          <div className="container">
            <div className="row">
              <ul className="l-footer">
                <li><img src={Bct} alt="" /></li>
                <li><a className='link-show'>
                  <i className="icon icon-address"></i>
                  <span>Cửa hàng</span> </a></li>
                <li>
                  <a href="#" className='hotline'>
                    <i className="icon icon-hotline">
                      
                    </i>
                  <span>1234 5678</span>
                  <span className='call-price'>(1000đ/phút, 9-22h)</span>
                  </a>
                  
                </li>
                <li>
                  <ul className="sub-mxh">
                    <li><img src={Fb} alt="Facebook" title='Facebook'/></li>
                    <li><img src={Instar} alt="Instagram" title='Instagram'/></li>
                    <li><img src={Zalo} alt="Zalo" title='Zalo'/></li>
                  </ul>
                </li>
                <li>
                  <span>Công ty</span>
                </li>
                <li><span>Chính sách khách hàng</span></li>
                <li><span>Hỗ trợ</span></li>
                <li><span>Phương thức thanh toán</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Công ty TNHH MTV Global Fashion. Văn phòng: Lầu 4 tòa nhà ACM số 96 Cao Thắng phường 04 quận 03 TP Hồ Chí Minh.</p>
          <p>GP số 
            <span style={{color:'#0090ff'}}>0314657558 </span>
          <span>do sở KHĐT Tp Hồ Chí Minh cấp lần đầu ngày 05/10/2017</span>
          </p>

        </div>
      </div>
  )
};

export default Footer;
