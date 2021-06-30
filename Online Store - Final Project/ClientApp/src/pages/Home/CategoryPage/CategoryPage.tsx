import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Category from '../../../models/Category';
import { getCategories, getItems } from '../../../redux/slices/inventorySlice';
import categoryPageStyles from './CategoryPageStyles';
import ItemCard from './ItemCard/ItemCard';

const CategoryPage = () => {
    //component styling
    const styles = categoryPageStyles();

    //get category param
    const { category } = useParams();

    //use navigate
    const navigate = useNavigate();

    //get categories
    const categories = useSelector(getCategories);

    //get items
    const items = useSelector(getItems);

    console.log(categories);

    //get filtered categories
    const filteredCategories =  categories.filter(x => x.categoryName.toLowerCase() === category);

    //if no category was found return home
    if (filteredCategories.length === 0) {
        navigate("/home");

        return null;
    }

    //get associated category
    const selectedCategory = filteredCategories[0];

    //get itmes for the selected category
    const categoryItems = items.filter(x => x.categoryId === selectedCategory.categoryId); 

    return (
        <div className={styles.container}>
            <Typography variant={"h5"} className={styles.title}>{selectedCategory.categoryName}</Typography>
            <Grid container spacing={3}>
                {/* Show Available Candies for the Categorty */}
                {categoryItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} className={styles.gridItem} key={index}>
                        <ItemCard item={item}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default CategoryPage;