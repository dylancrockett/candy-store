import { useSnackbar } from 'notistack';
import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import appStyles from './AppStyles';
import Navigation from './components/Navigation';
import Account from './pages/Account/Account';
import Login from './pages/Login/Login';
import { getLoggedIn } from './redux/slices/authSlice';
import Home from './pages/Home/Home';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Category from './models/Category';
import { setCategories, setItems } from './redux/slices/inventorySlice';

const App = () => {
  //component styling
  const styles = appStyles();

  //get if the user is logged in
  const loggedIn = useSelector(getLoggedIn);

  //get current location
  const location = useLocation();

  //use dispatch
  const dispatch = useDispatch();

  //get categories on component load
  useEffect(() => {
      axios({
          method: 'get',
          url: 'api/inventory/categories',
      })
      .then(r => dispatch(setCategories(r.data)))
      .catch(() => null);
  }, []);

  //get items on component load
  useEffect(() => {
    axios({
        method: 'get',
        url: 'api/inventory/items',
    })
    .then(r => dispatch(setItems(r.data)))
    .catch(() => null);
}, []);

  //require login wrapper
  const LoginRequired = ({children}: {children: JSX.Element}) => {
    if (loggedIn) return children;
    else return <Navigate to={"/login"}/>
  }

  return (
    <div className={styles.root}>
      {/* App Navigation */}
      {location.pathname === "/login" ? null : (<Navigation/>)}

      <div className={styles.content}>
        {/* App Content */}
        <Routes>
          {/* Checkout Page */}
          <Route path={"/checkout"} element={<LoginRequired><div/></LoginRequired>}/>

          {/* User Account Page (Login Required) */}
          <Route path={"/account"} element={<LoginRequired><Account/></LoginRequired>}/>

          {/* Login Page */}
          <Route path={"/login"} element={<Login/>}/>

          {/* Home Page */}
          <Route path={"/*"} element={<Home/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;