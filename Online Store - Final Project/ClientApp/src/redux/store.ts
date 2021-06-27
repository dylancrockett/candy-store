import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authReducer } from './slices/authSlice';
import { inventoryReducer } from './slices/inventorySlice';
import { shoppingCartReducer } from './slices/shoppingCartSlice';



//root reeducer
const rootReducer = combineReducers({
    shoppingCart: shoppingCartReducer,
    auth: authReducer,
    inventory: inventoryReducer
})

//export RootState as a type
export type RootState = ReturnType<typeof rootReducer>;

//configure app store
const store = configureStore({
    reducer: rootReducer,
})

//configure custom dispatch typing
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => { return useDispatch<AppDispatch>() }; // Export a hook that can be reused to resolve types

//export store
export default store;