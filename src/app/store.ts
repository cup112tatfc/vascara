import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { toggleSlice } from './toggleSlice/toggleSlice';
import productSlice from './productSlice/productSlice';
import filterSlice from './FiltersSlice/filtersSlice';
import userSlice from './userSlice/userSlice';
import cartSlice from './cartSlice/cartSlice';
export const store = configureStore({
  reducer: {
    toggleSlice: toggleSlice.reducer,
    productSlice: productSlice.reducer,
    filterSlice: filterSlice.reducer,
    userSlice: userSlice.reducer,
    cartSlice: cartSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
