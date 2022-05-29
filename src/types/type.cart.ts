export type ProductOfCart = {
  id: number | string;
  categoryId: number | string;
  img: string[];
  name: string;
  color: string;
  size: string | number;
  quantity: number;
  totalPrice: number;
  price: number;
  priceOff: number;
  priceMain: number;
  idDel: string;
  totalQuantity: number;
};
export type totalProduct = {
  totalAmount: number;
  totalQuantity: number;
};
export type Cart = {
  id: string;
  categoryId: string;
  cart: ProductOfCart[];
  totalAmount: number;
  totalQuantity: number;
};
