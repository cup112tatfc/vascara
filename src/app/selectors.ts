import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const menuToggleResSelector = (state: RootState) => state.toggleSlice.booleanToggle;
export const productsSelector = (state: RootState) => state.productSlice.products;
export const slideProductNewsSelector = (state: RootState) => state.productSlice.slideProductNews;
export const SlideProductSaleOffSelector = (state: RootState) =>
  state.productSlice.slideProductSaleOff;
export const productIdSelector = (state: RootState) => state.productSlice.productId;
export const productSamesSelector = (state: RootState) => state.productSlice.productSames;
export const productsOfCateSelector = (state: RootState) => state.productSlice.productsOfCate;
export const productSearchSelector = (state: RootState) => state.productSlice.productSearch;
export const filtersSelector = (state: RootState) => state.filterSlice;
export const checkUserEmailSelector = (state: RootState) => state.userSlice.checkUerEmail;
export const checkUserPhonenumberSelector = (state: RootState) => state.userSlice.checkUserPhone;
export const UsersSelector = (state: RootState) => state.userSlice.users;
export const checkUserSelector = (state: RootState) => state.userSlice.checkUser;
export const userSelector = (state: RootState) => state.userSlice.user;
export const CartSelector = (state: RootState) => state.cartSlice.cart;
export const CartBeforLogin = (state: RootState) => state.cartSlice.cartBeforLogin;
export const totalProductSelector = (state: RootState) => state.cartSlice.totalProduct;

export const productsOfCateRemainingSelector = createSelector(
  productsOfCateSelector,
  filtersSelector,
  (productsOfCate, filters) => {
    return productsOfCate.filter((product) => {
      return (
        (filters.prices.length
          ? product.saleOff
            ? product.priceOff >= filters.prices[0] && product.priceOff <= filters.prices[1]
            : product.price >= filters.prices[0] && product.price <= filters.prices[1]
          : true) &&
        (filters.colors.length ? filters.colors.includes(product.color) : true) &&
        (filters.heelStyles.length ? filters.heelStyles.includes(product.heelStyle) : true) &&
        (filters.toeStyles.length ? filters.toeStyles.includes(product.toeStyle) : true) &&
        (filters.strapTypes.length ? filters.strapTypes.includes(product.strapType) : true) &&
        (filters.lockTypes.length ? filters.lockTypes.includes(product.lockType) : true)
      );
    });
  }
);
