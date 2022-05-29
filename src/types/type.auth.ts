export type User = {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
};
export type LoginDataType = {
  email: string;
  password: string;
  phoneNumber: number;
};
export type RegisterDatatype = {
  email: string;
  phoneNumber: string;
  password: string;
  conFpassword: string;
  username: string;
  id: string;
};
export type RegisterErrors = {
  email: string;
  phoneNumber: string;
  password: string;
  conFpassword: string;
  username: string;
};
export type userLogin = {
  emOrPhone: string | number;
  password: string;
};


export type AuthStatus = 'none' | 'success' | 'fail';
