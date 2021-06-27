import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import Category from '../../models/Category';
import axios from 'axios';
import CategoryPage from './CategoryPage/CategoryPage';
import { Grid, Typography, Card, CardMedia, CardActionArea, CardContent } from '@material-ui/core';
import homeStyles from './HomeStyles';
import { useSelector } from 'react-redux';
import { getCategories, getItems } from '../../redux/slices/inventorySlice';
import ItemCard from './CategoryPage/ItemCard/ItemCard';

const HomePage = () => {
    //component styling
    const styles = homeStyles();

    //use navigate
    const navigate = useNavigate();

    //get available product categories
    const categories = useSelector(getCategories);

    //get available items
    const items = useSelector(getItems);

    console.log(items);

    //function for getting randomized list of 6 items
    const getFeaturedItems = () => {
        const array = items.slice(0, 6);

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    return (
        <>
            {/* Home Description */}
            <div className={styles.categoryContainer}>
                <Typography variant={"h5"} className={styles.categoryTitle}>{"About"}</Typography>
                <Typography variant={"body1"}>
                    Welcome to the web candy store! We have a wide assortment of various candies available for purchase. Feel free to browse by category of candy or pick from one of our featured candies!
                </Typography>
            </div>

            {/* Candy Categories */}
            <div className={styles.categoryContainer}>
                <Typography variant={"h5"} className={styles.categoryTitle}>{"Candy Categories"}</Typography>
                <Grid container spacing={3}>
                    {/* Show Category Options in the Grid */}
                    {(categories ?? []).map((category, index) => (
                        <Grid item xs={6} sm={6} md={4} lg={2} key={index}>
                            <Card>
                                <CardActionArea onClick={() => navigate("/category/" + category.categoryName.toLowerCase())}>
                                    <CardMedia
                                        className={styles.categoryCardMedia}
                                        image={"/images/categories/" + category.categoryImage}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant={"h5"} component={"h4"}>{category.categoryName}</Typography>
                                        <Typography variant={"body2"} component={"p"} className={styles.categoryCardDescription}>
                                            {category.categoryDescription}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>

            {/* Featured Items */}
            <div className={styles.categoryContainer}>
                <Typography variant={"h5"} className={styles.categoryTitle}>{"Featured Candy"}</Typography>
                <Grid container spacing={3}>
                    {/* Show Category Options in the Grid */}
                    {getFeaturedItems().map((item, index) => (
                        <Grid item xs={6} sm={6} md={4} lg={2} key={index}>
                            <ItemCard item={item}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
};

//page render
const Home = () => {
    return (
        <Routes>
            <Route path={"/home"} element={<HomePage/>}/>
            <Route path={"/category/:category"} element={<CategoryPage/>}/>
            {/* Redirect to /home as a fallback */}
            <Route element={<Navigate to={"/home"}/>}/>
        </Routes>
    );
};

export default Home;