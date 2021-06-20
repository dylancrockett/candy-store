import { Home } from '@material-ui/icons';
import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import appStyles from './AppStyles';
import Navigation from './components/Navigation';
import Account from './pages/Account/Account';
import Login from './pages/Login/Login';
import { getLoggedIn } from './redux/slices/authSlice';

const App = () => {
  //component styling
  const styles = appStyles();

  //get if the user is logged in
  const loggedIn = useSelector(getLoggedIn);

  //get current location
  const location = useLocation();

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
          {/* Home Page */}
          <Route path={"/home"} element={<Home/>}/>

          {/* Checkout Page */}

          {/* User Account Page (Login Required) */}
          <Route path={"/account"} element={<LoginRequired><Account/></LoginRequired>}/>

          {/* Login Page */}
          <Route path={"/login"} element={<Login/>}/>

          {/* Redirect to /home as a fallback */}
          <Route element={<Navigate to={"/home"}/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;