import { AppBar, Badge, Button, IconButton, Toolbar } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from 'react-redux';
import { getShoppingCartItemCount } from '../redux/slices/shoppingCartSlice';
import navigationStyles from './NavigationStyles';
import { getLoggedIn } from '../redux/slices/authSlice';
import PersonIcon from '@material-ui/icons/Person';

const Navigation = () => {
    //component styling
    const styles = navigationStyles();

    //use navigate from react router
    const navigate = useNavigate();

    //number of items in the user's shopping cart
    const itemsInCart = useSelector(getShoppingCartItemCount); 

    //get if the user is logged in
    const loggedIn = useSelector(getLoggedIn);

    return (
        // top bar
        <AppBar position={"static"}>
            {/* Item Toolbar */}
            <Toolbar>
                {/* User Account */}
                <Button
                    variant={"text"}
                    startIcon={<PersonIcon/>}
                    onClick={() => navigate("/account")}
                    className={styles.accountBtn}
                >{"Account"}</Button>

                {/* Shopping Cart Button */}
                <IconButton
                    onClick={() => navigate("/checkout/cart")}
                    className={styles.shoppingCartBtn}
                >
                    <Badge badgeContent={itemsInCart} color={"secondary"} showZero>
                        <ShoppingCartIcon/>
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
};

export default Navigation;