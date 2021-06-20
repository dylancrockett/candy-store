import React from 'react';
import { Route, Routes } from 'react-router';

const HomeConent = () => {
    return (
        <div>

        </div>
    );
};

//page render
const Home = () => {


    return (
        <Routes>
            <Route path={"/"} element={<HomeConent/>}/>
            <Route path={"/chocolate"} element={<div/>}/>
        </Routes>
    );
};