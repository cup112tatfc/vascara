import { ProductOfCart, totalProduct } from 'types/type.cart';

export const Calculator = (item: ProductOfCart[], type: number) => {
  let total: number = 0;
  let l = item.length;
  if (type === 1) {
    for (let i = 0; i < l; i++) {
      total += item[i].totalPrice;
    }
    return total;
  } else {
    for (let i = 0; i < l; i++) {
      total += item[i].quantity;
    }
    return total;
  }
};
export const AddProduct = (
  state: ProductOfCart[],
  payload: ProductOfCart,
  totalProduct: totalProduct
) => {
  const randomId = Math.random().toString(36).slice(2);
  if (payload.size) {
    const itemIndex = state.findIndex(
      (item) => item.id === payload.id && item.size === payload.size
    );
    if (itemIndex >= 0) {
      state[itemIndex].quantity += payload.quantity;
      state[itemIndex].totalPrice += payload.totalPrice;
      totalProduct.totalAmount += payload.totalPrice;
      totalProduct.totalQuantity += payload.quantity;
    } else {
      const tempProduct = { ...payload, idDel: randomId };
      state.push(tempProduct);
      totalProduct.totalAmount += payload.totalPrice;
      totalProduct.totalQuantity += payload.quantity;
    }
  } else {
    const itemIndex = state.findIndex((item) => item.id === payload.id);
    if (itemIndex >= 0) {
      state[itemIndex].quantity += payload.quantity;
      state[itemIndex].totalPrice += payload.totalPrice;
      totalProduct.totalAmount += payload.totalPrice;
      totalProduct.totalQuantity += payload.quantity;
    } else {
      const tempProduct = { ...payload, idDel: randomId };
      state.push(tempProduct);
      totalProduct.totalAmount += payload.totalPrice;
      totalProduct.totalQuantity += payload.quantity;
    }
  }
};
export const Increasequatity = (
  state: ProductOfCart[],
  payload: ProductOfCart,
  totalProduct: totalProduct
) => {
  const itemIndex = state.findIndex((item) => item.idDel === payload.idDel);
  state[itemIndex].quantity += 1;
  state[itemIndex].totalPrice += state[itemIndex].priceMain;
  totalProduct.totalAmount += state[itemIndex].priceMain;
  totalProduct.totalQuantity += 1;
};
export const Decreasequatity = (
  state: ProductOfCart[],
  payload: ProductOfCart,
  totalProduct: totalProduct
) => {
  const itemIndex = state.findIndex((item) => item.idDel === payload.idDel);
  state[itemIndex].quantity -= 1;
  state[itemIndex].totalPrice -= state[itemIndex].priceMain;
  totalProduct.totalAmount -= state[itemIndex].priceMain;
  totalProduct.totalQuantity -= 1;
};
export const DelProduct = (
  state: ProductOfCart[],
  payload: ProductOfCart,
  totalProduct: totalProduct
) => {
  const newArr = state.filter((item) => {
    return item.idDel !== payload.idDel;
  });
  totalProduct.totalAmount = Calculator(newArr, 1);
  totalProduct.totalQuantity = Calculator(newArr, 0);
  return newArr;
};
