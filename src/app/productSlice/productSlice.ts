import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Product from '../../types/type.product';
import axios from 'axios';

const baseUrl = 'https://fake-server-for-project.herokuapp.com/api';

export const fetchAsyncProducts = createAsyncThunk('products/fetchAsyncProducts', async () => {
  const response = await axios.get(`${baseUrl}/products?_start=8&_end=20`);
  return response.data;
});

export const fetchAsyncSlideProductNews = createAsyncThunk(
  'slideProductNews/fetchAsyncSlideProductNews',
  async () => {
    const response = await axios.get(`${baseUrl}/products?new=true`);
    return response.data;
  }
);

export const fetchAsyncSlideProductSaleOff = createAsyncThunk(
  'slideProductSaleOff/fetchAsyncSlideProductSaleOff',
  async () => {
    const response = await axios.get(`${baseUrl}/products?saleOff=true`);
    return response.data;
  }
);

export const fetchAsyncProductId = createAsyncThunk(
  'productId/fetchAsyncProductId',
  async (id: any) => {
    const response = await axios.get<Product>(`${baseUrl}/products/${id}`);
    return response.data;
  }
);

export const fetchAsyncProductSames = createAsyncThunk(
  'productSames/fetchAsyncProductSames',
  async ({ idCate, idProduct }: { idCate: any; idProduct: any }) => {
    const response = await axios.get(
      `${baseUrl}/products?categoryId=${idCate}&id_ne=${idProduct}&_limit=8`
    );
    return response.data;
  }
);

export const fetchAsyncListProducts = createAsyncThunk(
  'productsOfCate/fetchAsyncListProducts',
  async (idCate: number) => {
    const response = await axios.get<Array<Product>>(`${baseUrl}/products?categoryId=${idCate}`);
    return response.data;
  }
);
export const fetchAsyncSearchProduct = createAsyncThunk(
  'product/fetchAsyncSearchProduct',
  async (wordSearch: string) => {
    const response = await axios.get<Array<Product>>(`${baseUrl}/products?q=${wordSearch}`);
    return response.data;
  }
);

const initialState = {
  status: 'idle',
  products: [],
  slideProductNews: [],
  slideProductSaleOff: [],
  productId: {} as Product,
  productSames: [],
  productsOfCate: [] as Array<Product>,
  productSearch: [] as Array<Product>,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    removeProductDetail: (state, action: PayloadAction<any>) => {
      state.productId = action.payload;
    },
    removeProductSames: (state, action: PayloadAction<any>) => {
      state.productSames = action.payload;
    },
    removeListProducts: (state, action: PayloadAction<any>) => {
      state.productsOfCate = action.payload;
    },
    removeProductSearch: (state, action: PayloadAction<any>) => {
      state.productSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
        return { ...state, products: action.payload };
      })
      .addCase(fetchAsyncProducts.rejected, (state, action) => {
        state.status = 'rejected';
        console.log('rejected');
      })
      .addCase(fetchAsyncSlideProductNews.fulfilled, (state, action) => {
        return { ...state, slideProductNews: action.payload };
      })
      .addCase(fetchAsyncSlideProductSaleOff.fulfilled, (state, action) => {
        return { ...state, slideProductSaleOff: action.payload };
      })
      .addCase(fetchAsyncProductId.fulfilled, (state, action) => {
        return { ...state, productId: action.payload };
      })
      .addCase(fetchAsyncProductSames.fulfilled, (state, action) => {
        return { ...state, productSames: action.payload };
      })
      .addCase(fetchAsyncListProducts.fulfilled, (state, action) => {
        return { ...state, productsOfCate: action.payload };
      })
      .addCase(fetchAsyncSearchProduct.fulfilled, (state, action) => {
        return { ...state, productSearch: action.payload };
      });
  },
});
export const { removeProductDetail, removeProductSames, removeListProducts, removeProductSearch } =
  productSlice.actions;
export default productSlice;
