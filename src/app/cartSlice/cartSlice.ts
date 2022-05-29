import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cart, ProductOfCart, totalProduct } from 'types/type.cart';
import { AddProduct, Calculator, Decreasequatity, DelProduct, Increasequatity } from './calculator';

const baseUrl = 'https://fake-server-for-project.herokuapp.com/api/cartUsers';

export const fetchAsyncGetCart = createAsyncThunk('cart/fetchGetCart', async (id: string) => {
  const response = await axios.get<Cart>(`${baseUrl}?categoryId=${id}/cart`);
  return response.data;
});

export const fetchAsyncCreateCart = createAsyncThunk(
  'cart/fetchCreateCart',
  async (newCart: Cart) => {
    const response = await axios
      .post(`${baseUrl}`, newCart)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(response);
  }
);
export const fetchAsyncAddProductToCart = createAsyncThunk(
  'cart/fefetchAsyncAddProductToCart',
  async ({ id, product }: { id: string; product: ProductOfCart }) => {
    const response = await axios.post(`${baseUrl}?id=${id}/cart`, product);
  }
);

const valuecart = localStorage.getItem('cartItems');
const valuetotal = localStorage.getItem('totalItems');

const initialState = {
  status: 'idle',
  cart: {} as Cart,
  cartBeforLogin:
    typeof valuecart === 'string'
      ? (JSON.parse(valuecart) as ProductOfCart[])
      : ([] as ProductOfCart[]),
  totalProduct:
    typeof valuetotal === 'string' && typeof valuecart === 'string'
      ? (JSON.parse(valuetotal) as totalProduct)
      : ({
          totalAmount: 0,
          totalQuantity: 0,
        } as totalProduct),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state, action) => {
      state.cart = {} as Cart;
    },
    AddtoCartBeforLogin: (state, action: PayloadAction<ProductOfCart>) => {
      AddProduct(state.cartBeforLogin, action.payload, state.totalProduct);
      localStorage.setItem('cartItems', JSON.stringify(state.cartBeforLogin));
      localStorage.setItem('totalItems', JSON.stringify(state.totalProduct));
    },
    IncreasequatityProduct: (state, action: PayloadAction<ProductOfCart>) => {
      Increasequatity(state.cartBeforLogin, action.payload, state.totalProduct);
      localStorage.setItem('cartItems', JSON.stringify(state.cartBeforLogin));
      localStorage.setItem('totalItems', JSON.stringify(state.totalProduct));
    },
    DecreasequatityProduct: (state, action: PayloadAction<ProductOfCart>) => {
      Decreasequatity(state.cartBeforLogin, action.payload, state.totalProduct);
      localStorage.setItem('cartItems', JSON.stringify(state.cartBeforLogin));
      localStorage.setItem('totalItems', JSON.stringify(state.totalProduct));
    },
    DeleteProduct: (state, action: PayloadAction<ProductOfCart>) => {
      state.cartBeforLogin = DelProduct(state.cartBeforLogin, action.payload, state.totalProduct);
      localStorage.setItem('cartItems', JSON.stringify(state.cartBeforLogin));
      localStorage.setItem('totalItems', JSON.stringify(state.totalProduct));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncGetCart.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchAsyncGetCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchAsyncGetCart.rejected, (state, action) => {
        state.status = 'rejected';
      })
      .addCase(fetchAsyncCreateCart.fulfilled, (state, action) => {});
  },
});
export const {
  AddtoCartBeforLogin,
  DeleteProduct,
  IncreasequatityProduct,
  DecreasequatityProduct,
} = cartSlice.actions;
export default cartSlice;
