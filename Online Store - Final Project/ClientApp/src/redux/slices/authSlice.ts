import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Auth {
    state: 'inital',
    value: {
        loggedIn: boolean
    }
};

//initial state for auth
const initialState: Auth = {
    state: 'inital',
    value: {
        loggedIn: false
    }
};

//auth slice 
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.value.loggedIn = action.payload;
        }
    }
})

//export actions
export const { setLoggedIn } = authSlice.actions;

//get if the user is currently logged in
export const getLoggedIn = (state: RootState) => { return state.auth.value.loggedIn; };

//export reducer
export const authReducer = authSlice.reducer;