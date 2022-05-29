import React from 'react';
import { ProductOfCart } from 'types/type.cart';
import Product from 'types/type.product';

export const TotalPrice = (quantity: number, price: number) => {
  return quantity * price;
};
export const CheckProductOfCart = (
  product: Product,
  choseSize: string | number,
  productOfCart: ProductOfCart,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setCheckToAdd: React.Dispatch<React.SetStateAction<boolean>>,
  setProductOfCart: React.Dispatch<React.SetStateAction<ProductOfCart>>
) => {
  if (product.sizes) {
    if (choseSize) {
      setError('');
      setCheckToAdd(true);
      setProductOfCart({ ...productOfCart, size: choseSize });
    } else {
      setError('Vui lòng chọn kích cỡ.');
    }
  } else {
    setCheckToAdd(true);
    setProductOfCart({ ...productOfCart, size: choseSize });
  }
};

export const PriceMain = (product: Product) => {
  let piceMain: number;
  if (product.saleOff) {
    piceMain = product.priceOff;
  } else {
    piceMain = product.price;
  }
  return piceMain;
};
