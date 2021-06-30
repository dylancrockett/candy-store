import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Item from "../../models/Item";
import { RootState } from "../store";

interface CartItem {
    item: Item,
    amount: number,
}

interface ShoppingCart {
    state: 'inital',
    value: {
        cart: { [key: number]: number }
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
        incrementCartItem: (state, action: PayloadAction<Item>) => {
            if (!(action.payload.itemId in state.value.cart)) {
                state.value.cart[action.payload.itemId] = 1;
                return;
            }

            state.value.cart[action.payload.itemId] = state.value.cart[action.payload.itemId] + 1;
        },
        decrementCartItem: (state, action: PayloadAction<Item>) => {
            if (!(action.payload.itemId in state.value.cart)) return;
            if (state.value.cart[action.payload.itemId] === 0) return;
            if (state.value.cart[action.payload.itemId] === 1) {
                delete state.value.cart[action.payload.itemId];
                return;
            };

            state.value.cart[action.payload.itemId] = state.value.cart[action.payload.itemId] + -1;
        },
        removeCartItem: (state, action: PayloadAction<Item>) => {
            if (!(action.payload.itemId in state.value.cart)) return;
            delete state.value.cart[action.payload.itemId];
        }
    }
})

//export actions
export const { incrementCartItem, decrementCartItem, removeCartItem } = shoppingCartSlice.actions;

//return the current shopping cart
export const getShoppingCart = (state: RootState) => { return state.shoppingCart.value.cart; };

//return the current # of items in the shopping cart
export const getShoppingCartItemCount = (state: RootState) => { 
    let totalItems = 0;
    
    for (var key in state.shoppingCart.value.cart) {
        totalItems += state.shoppingCart.value.cart[key];
    }

    return totalItems;
};

//return the total cost of the shopping cart
export const getShoppingCartTotal = (state: RootState) => { 
    let total = 0;
    
    for (var key in state.shoppingCart.value.cart) {
        //get the item
        const item = state.inventory.value.items?.find(x => x.itemId === Number(key));

        if (item === undefined) continue;
        
        total += state.shoppingCart.value.cart[key] * item.itemCost;
    }

    return total;
};

interface CartItemTotal {
    item: Item,
    amount: number,
    total: number
}

//get a list of items in the cart, the count of the item, and total cost for that item & its count
export const getShoppingCartItemTotals = (state: RootState) => {
    const itemTotals: CartItemTotal[] = [];
    
    for (var key in state.shoppingCart.value.cart) {
        //get the item
        const item = state.inventory.value.items?.find(x => x.itemId === Number(key));

        if (item === undefined) continue;
        
        itemTotals.push({
            item: item,
            amount: state.shoppingCart.value.cart[key],
            total: state.shoppingCart.value.cart[key] * item.itemCost
        });
    }

    return itemTotals;
}

//export reducer
export const shoppingCartReducer = shoppingCartSlice.reducer;