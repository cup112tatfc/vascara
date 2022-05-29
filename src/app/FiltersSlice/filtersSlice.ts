import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitStateFilters } from 'types/type.initStateFilters';
const state: InitStateFilters = {
  prices: [],
  colors: [],
  heelStyles: [],
  toeStyles: [],
  strapTypes: [],
  lockTypes: [],
};
const filterSlice = createSlice({
  name: 'filters',
  initialState: state,
  reducers: {
    getAllFilterChange: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
export const { getAllFilterChange } = filterSlice.actions;
export default filterSlice;
