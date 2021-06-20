import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ShoppingCart {
    state: 'inital',
    value: {
        cart: string[]
    }
};

//initial state for shopping cart
const initialState: ShoppingCart = {
    state: 'inital',
    value: {
        cart: []
    }
};

//shopping cart slice 
const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<string>) => {
            state.value.cart.push(action.payload);
        }
    }
})

//export actions
export const { addItemToCart } = shoppingCartSlice.actions;

//return the current shopping cart
export const getShoppingCart = (state: RootState) => { return state.shoppingCart.value.cart; };

//return the current # of items in the shopping cart
export const getShoppingCartItemCount = (state: RootState) => { return state.shoppingCart.value.cart.length; };

//export reducer
export const shoppingCartReducer = shoppingCartSlice.reducer;