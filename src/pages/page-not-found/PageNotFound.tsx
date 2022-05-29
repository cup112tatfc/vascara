import * as React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.scss';


const PageNotFoundProps: React.FunctionComponent = () => {
  return <div className='not-found'>
      <h3 className="title">Không tìm thấy trang cần xem</h3>
      <p className="info">Xin lỗi , bạn đang tìm kiếm trang không tồn tại</p>
      <p className="back">
        <Link to='/' className='btn btn-secondary'>Trở về trang chủ</Link>
      </p>
  </div>
};

export default PageNotFoundProps;
