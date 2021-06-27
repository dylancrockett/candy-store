import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Category from "../../models/Category";
import Item from "../../models/Item";
import { RootState } from "../store";

interface Inventory {
    state: 'inital',
    value: {
        categories: Category[] | undefined,
        items: Item[] | undefined
    }
};

//initial state for auth
const initialState: Inventory = {
    state: 'inital',
    value: {
        categories: undefined,
        items: undefined
    }
};

//auth slice 
const inventorySlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.value.categories = action.payload;
        },
        setItems: (state, action: PayloadAction<Item[]>) => {
            state.value.items = action.payload;
        }
    }
})

//export actions
export const { setCategories, setItems } = inventorySlice.actions;

//get a list of product categories
export const getCategories = (state: RootState) => { return state.inventory.value.categories ?? [] };

//get a list of items
export const getItems = (state: RootState) => { return state.inventory.value.items ?? [] }

//search item type 
interface SearchItem {
    item: string,
    page: string
}

//get a list of merged items & categories with the name and url to navigate to it's pae
export const getSearchItems = (state: RootState) => {
    //results array
    const results: SearchItem[] = [];

    //add categories
    for (var category of (state.inventory.value.categories ?? [])) {
        results.push({ 
            item: category.categoryName + " (Category)", 
            page: "/category/" + category.categoryName.toLowerCase()
        });
    }

    //add items
    for (var item of (state.inventory.value.items ?? [])) {
        results.push({
            item: item.itemName,
            page: "/item/" + item.itemId
        })
    }

    return results;
}

//export reducer
export const inventoryReducer = inventorySlice.reducer;