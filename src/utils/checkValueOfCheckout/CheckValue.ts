import { errorValue, userLogin, valueAddress, valueLogin } from 'pages/checkout/Checkout';
import React from 'react';
import { User } from 'types/type.auth';

export const checkValueLogin = (
  error: errorValue,
  setError: React.Dispatch<React.SetStateAction<errorValue>>,
  typeLogin: number,
  valueLogin: valueLogin,
  userLogin: userLogin,
  setUserLogin: React.Dispatch<React.SetStateAction<userLogin>>,
  users: User[],
  setStep: React.Dispatch<React.SetStateAction<string>>,
  checkoutBrumb: Array<number>
) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexNumber = /^-?\d*$/;
  const lengthUsers = users.length;
  if (typeLogin === 1) {
    if (!valueLogin.emOrPhone || !valueLogin.password) {
      return setError({
        ...error,
        typeError: 1,
        textError: 'Vui lòng nhập Email / Số điện thoại và Mật khẩu để đăng nhập',
      });
    } else {
      if (regexNumber.test(valueLogin.emOrPhone)) {
        if (valueLogin.emOrPhone.length === 10) {
          for (let i = 0; i < lengthUsers; i++) {
            if (
              users[i].phoneNumber === valueLogin.emOrPhone &&
              users[i].password === valueLogin.password
            ) {
              checkoutBrumb.push(2);
              return setStep(valueLogin.emOrPhone);
            }
          }
          return setError({
            ...error,
            typeError: 1,
            textError: 'Email / Số điện thoại không tồn tại hoặc Mật khẩu không đúng',
          });
        } else {
          setError({
            ...error,
            typeError: 1,
            textError:
              'Email/ Số điện thoại không đúng (Vui lòng nhập đúng số điện thoại theo quy định của Bộ Thông Tin & Truyền Thông (10 số))',
          });
        }
      } else {
        if (regexEmail.test(valueLogin.emOrPhone)) {
          for (let i = 0; i < lengthUsers; i++) {
            if (
              users[i].email === valueLogin.emOrPhone &&
              users[i].password === valueLogin.password
            ) {
              checkoutBrumb.push(2);
              return setStep(valueLogin.emOrPhone);
            }
          }
          return setError({
            ...error,
            typeError: 1,
            textError: 'Email / Số điện thoại không tồn tại hoặc Mật khẩu không đúng',
          });
        } else {
          setError({
            ...error,
            typeError: 1,
            textError:
              'Email/ Số điện thoại không đúng (Vui lòng nhập đúng số điện thoại theo quy định của Bộ Thông Tin & Truyền Thông (10 số))',
          });
        }
      }
    }
  } else {
    if (!valueLogin.phoneNumberOrEm) {
      return setError({
        ...error,
        typeError: 1,
        textError: 'Vui lòng nhập Email / Số điện thoại để đăng nhập',
      });
    } else if (regexNumber.test(valueLogin.phoneNumberOrEm)) {
      if (valueLogin.phoneNumberOrEm.length === 10) {
        checkoutBrumb.push(2);
        return setStep(valueLogin.phoneNumberOrEm);
      } else {
        setError({
          ...error,
          typeError: 1,
          textError:
            'Email/ Số điện thoại không đúng (Vui lòng nhập đúng số điện thoại theo quy định của Bộ Thông Tin & Truyền Thông (10 số))',
        });
      }
    } else {
      if (regexEmail.test(valueLogin.phoneNumberOrEm)) {
        checkoutBrumb.push(2);
        return setStep(valueLogin.phoneNumberOrEm);
      } else {
        setError({
          ...error,
          typeError: 1,
          textError:
            'Email/ Số điện thoại không đúng (Vui lòng nhập đúng số điện thoại theo quy định của Bộ Thông Tin & Truyền Thông (10 số))',
        });
      }
    }
  }
};
export const checkValueAddress = (
  error: errorValue,
  setError: React.Dispatch<React.SetStateAction<errorValue>>,
  valueAddress: valueAddress,
  setStep: React.Dispatch<React.SetStateAction<string>>
) => {
  console.log(valueAddress)
  if (
    !valueAddress.city ||
    !valueAddress.district ||
    !valueAddress.phoneNumber ||
    !valueAddress.textAddress ||
    !valueAddress.username ||
    !valueAddress.ward
  ) {
    setError({
      ...error,
      typeError: 2,
      textError: 'Vui lòng nhập đầy đủ thông tin người nhận hàng',
    });
  } else {
    setError({
      ...error,
      typeError: 2,
      textError: '',
    });
    setStep(
      `${valueAddress.username}, ${valueAddress.textAddress}, ${valueAddress.ward}, ${valueAddress.district}, ${valueAddress.city}`
    );
  }
};
