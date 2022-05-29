import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface toggle {
    booleanToggle:boolean,

}
const initialState:toggle= {
    booleanToggle:false,
    
}
export const toggleSlice = createSlice({
    name:'changeToggleMenu',
    initialState,
    reducers:{
        toggleMenuRes: (state,action:PayloadAction<boolean>) =>{
            state.booleanToggle = action.payload;
        },
    }
})

export const {toggleMenuRes} = toggleSlice.actions;