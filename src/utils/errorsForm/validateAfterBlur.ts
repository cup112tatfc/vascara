import React from 'react';
import { RegisterErrors } from 'types/type.auth';

export const ValidateAfterBlur = (
  name: string,
  value: string,
  oberror: RegisterErrors,
  setOberror: React.Dispatch<React.SetStateAction<RegisterErrors>>,
  password?: string
) => {

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexNumber = /^-?\d*$/;
  if (name === 'email') {
    if (!value) {
      setOberror({ ...oberror, [name]: 'Email không được rỗng' });
    } else if (!regexEmail.test(value)) {
      setOberror({ ...oberror, [name]: 'Email không đúng định dạng' });
    } else {
      setOberror({
        ...oberror,
        [name]: '',
      });
    }
  }
  if (name === 'phoneNumber') {
    if (!value) {
      setOberror({ ...oberror, [name]: 'Số điện thoại không được rỗng' });
    } else if (value.length < 10 || !regexNumber.test(value)) {
      setOberror({
        ...oberror,
        [name]:
          'Vui lòng nhập đúng số điện thoại theo quy định của Bộ Thông Tin & Truyền Thông (10 số)',
      });
    } else {
      setOberror({
        ...oberror,
        [name]: '',
      });
    }
  }
  if (name === 'password') {
    if (!value) {
      setOberror({ ...oberror, [name]: 'Mật khẩu không được rỗng' });
    } else if (value.length < 6) {
      setOberror({
        ...oberror,
        [name]: 'Vui lòng nhập độ dài mật khẩu lớn hơn 6 kí tự',
      });
    } else {
      setOberror({
        ...oberror,
        [name]: '',
      });
    }
  }
  if (name === 'conFpassword') {
    if (!value) {
      setOberror({ ...oberror, [name]: 'Mật khẩu Nhập lại không được rỗng' });
    } else if (password && value.localeCompare(password) !== 0) {
      setOberror({
        ...oberror,
        [name]: 'Mật khẩu nhập lại không khớp',
      });
    } else {
      setOberror({
        ...oberror,
        [name]: '',
      });
    }
  }
  if (name === 'username') {
    if (!value) {
      setOberror({ ...oberror, [name]: 'Họ và tên không được rỗng' });
    } else {
      setOberror({
        ...oberror,
        [name]: '',
      });
    }
  }
};
