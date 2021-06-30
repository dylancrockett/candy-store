import { Card, CardMedia, CardContent, Typography, IconButton, Button, CardActions, ButtonGroup, useTheme, useMediaQuery } from '@material-ui/core';
import { Block } from '@material-ui/icons';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Item from '../../../../models/Item';
import { decrementCartItem, getShoppingCart, incrementCartItem, removeCartItem } from '../../../../redux/slices/shoppingCartSlice';
import itemCardStyles from './ItemCardStyles';
import DeleteIcon from '@material-ui/icons/Delete';

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const ItemCard = ({ item }: { item: Item }) => {
    //component styling
    const styles = itemCardStyles();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));
    
    //use navigate
    const navigate = useNavigate();

    //use dispatch
    const dispatch = useDispatch();

    //get the shopping cart
    const shoppingCart = useSelector(getShoppingCart);

    //get item count from shopping cart
    const itemCount = item.itemId in shoppingCart ? shoppingCart[item.itemId] : 0;

    console.log(itemCount);
    console.log(shoppingCart[item.itemId]);
    console.log(item.itemId in shoppingCart);

    return (
        <Card className={styles.gridCard}>
            {/* <CardActionArea onClick={() => navigate("/item/" + item.itemId)}> */}
            <CardMedia
                className={styles.cardMedia}
                image={"/images/items/" + item.itemImage}
            />
            <CardContent className={styles.cardDescription}>
                <Typography gutterBottom variant={"h5"} component={"h4"}>{item.itemName}</Typography>
                <div className={styles.itemCost}>
                    <Typography variant={"subtitle1"} className={styles.itemCostLabel}>{"Cost:"}</Typography>
                    <Typography variant={"subtitle1"}>{currencyFormatter.format(item.itemCost / 100)}</Typography>
                </div>                
                <Typography variant={"body2"} component={"p"}>
                    {item.itemDescription}
                </Typography>
            </CardContent>
            <CardActions>
                {/* Remove from Cart Button */}
                {itemCount > 0 ?  
                    isSmall ? (
                        <IconButton
                            onClick={() => dispatch(removeCartItem(item))}
                        ><DeleteIcon/></IconButton>
                    ) : (
                        <Button
                            color={"secondary"}
                            variant={"contained"}
                            onClick={() => dispatch(removeCartItem(item))}
                        >{"Remove"}</Button>
                    )
                : null}

                {/* Item Amount Selector */}
                <ButtonGroup variant={"contained"} className={styles.amountController}>
                    <Button
                        onClick={() => dispatch(decrementCartItem(item))}
                        className={styles.amountBtn}
                    >{"-"}</Button>
                    <Button
                        className={styles.amountText}
                        classes={{disabled: styles.amountTextD}}
                        disabled
                    >{itemCount}</Button>
                    <Button
                        onClick={() => dispatch(incrementCartItem(item))}
                        className={styles.amountBtn}
                    >{"+"}</Button>
                </ButtonGroup>

                {/* Add to Card Button */}
                {/* <Button
                    color={"primary"}
                    variant={"contained"}
                >{"Add"}</Button> */}
            </CardActions>
        </Card>
);
};

export default ItemCard;