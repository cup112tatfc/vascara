import { RegisterErrors } from 'types/type.auth';

export const Validate = (values: RegisterErrors) => {
  const errors: RegisterErrors = {
    email: '',
    phoneNumber: '',
    password: '',
    conFpassword: '',
    username: '',
  };

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexNumber = /^-?\d*$/;
  if (!values.email) {
    errors.email = 'Email không được rỗng';
  } else if (!regexEmail.test(values.email)) {
    errors.email = 'Email không đúng định dạng';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Số điện thoại không được rỗng';
  } else if (values.phoneNumber.length < 10 || !regexNumber.test(values.phoneNumber)) {
    errors.phoneNumber =
      'Vui lòng nhập đúng số điện thoại theo quy định của Bộ Thông Tin & Truyền Thông (10 số)';
  }
  if (!values.password) {
    errors.password = 'Mật khẩu không được rỗng';
  } else if (values.password.length < 6) {
    errors.password = 'Vui lòng nhập độ dài mật khẩu lớn hơn 6 kí tự';
  }
  if (!values.conFpassword) {
    errors.conFpassword = 'Mật khẩu Nhập lại không được rỗng';
  } else if (values.conFpassword.localeCompare(values.password) !== 0) {
    errors.conFpassword = 'Mật khẩu nhập lại không khớp';
  }
  if (!values.username) {
    errors.username = 'Họ và tên không được rỗng';
  }
  return errors;
};
