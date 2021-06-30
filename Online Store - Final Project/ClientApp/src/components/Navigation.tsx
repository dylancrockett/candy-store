import { Paper, Divider, AppBar, Badge, Button, IconButton, Toolbar, TextField, InputAdornment, Drawer, Collapse, ListItemIcon, Popover, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from 'react-redux';
import { getShoppingCartItemCount, getShoppingCartItemTotals, getShoppingCartTotal } from '../redux/slices/shoppingCartSlice';
import navigationStyles from './NavigationStyles';
import { getLoggedIn } from '../redux/slices/authSlice';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import { Autocomplete } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { getCategories, getSearchItems, setCategories } from '../redux/slices/inventorySlice';
import { useState } from 'react';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const Navigation = () => {
    //component styling
    const styles = navigationStyles();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));

    //use navigate from react router
    const navigate = useNavigate();

    //number of items in the user's shopping cart
    const itemsInCart = useSelector(getShoppingCartItemCount); 

    //get if the user is logged in
    const loggedIn = useSelector(getLoggedIn);

    //cart popover anchor ref
    const cartPopoverAnchor = useRef(null);

    // if the shopping cart popover is open
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

    //drawer open state
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    //if the categories list is open
    const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);

    //get search items
    const searchItems = useSelector(getSearchItems);

    //get categories
    const categories = useSelector(getCategories);

    //get cart item totals
    const cartItemTotals = useSelector(getShoppingCartItemTotals);

    //get shopping cart total
    const cartTotal = useSelector(getShoppingCartTotal);

    //nav listitem 
    const NavListItem = ({text, url}: {text: string, url: string}) => (
        <ListItem button onClick={() => { setDrawerOpen(false); navigate(url); }}>
            <ListItemText primary={text}/>
        </ListItem>
    );

    return (
        <>
            {/* Top App Bar */}
            <AppBar position={"static"}>
                {/* Item Toolbar */}
                <Toolbar>
                    {/* Left Menu */}
                    <IconButton
                        edge={"start"}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon/>
                    </IconButton>

                    {/* Site Search */}
                    {isSmall ? null : (
                        <Autocomplete
                            value={null}
                            options={searchItems}
                            style={{width: 300, marginLeft: '20px'}}
                            getOptionLabel={(option) => option.item}
                            renderOption={(option) => option.item}
                            onChange={(event, value) => {
                                if (value !== null) navigate(value.page);
                            }}
                            renderInput={(params) => <TextField {...params} label={"Search"} variant={"outlined"} size={"small"} InputProps={{...params.InputProps, startAdornment: (<InputAdornment position={"start"}><SearchIcon/></InputAdornment>)}}/>}
                        />
                    )}

                    {/* User Account */}
                    <Button
                        variant={"text"}
                        startIcon={<PersonIcon/>}
                        onClick={() => navigate("/account")}
                        className={styles.accountBtn}
                    >{"Account"}</Button>

                    {/* Shopping Cart Button */}
                    <IconButton
                        ref={cartPopoverAnchor}
                        className={styles.shoppingCartBtn}
                        onClick={() => { setPopoverOpen(true);  console.log((popoverOpen))}}
                        onMouseOver={isSmall ? undefined : () => setPopoverOpen(true)}
                    >
                        <Badge badgeContent={itemsInCart} color={"secondary"} showZero>
                            <ShoppingCartIcon color={"action"}/>
                        </Badge>
                    </IconButton>

                    {/* Shopping Cart Preview Popover */}
                    <Popover 
                        anchorEl={cartPopoverAnchor.current}
                        open={popoverOpen} 
                        onClose={() => setPopoverOpen(false)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Paper>
                            <List>
                                {cartItemTotals.map((itemTotal, index) => (
                                    <ListItem key={index}>
                                        <Typography className={styles.cartViewItemName} variant={"subtitle1"}>{itemTotal.item.itemName + " x" + itemTotal.amount + "..."}</Typography>
                                        <Typography className={styles.cartViewItemTotal} variant={"subtitle1"}>{currencyFormatter.format(itemTotal.total / 100)}</Typography>
                                    </ListItem>
                                ))}
                                {cartItemTotals.length > 0 ? <Divider className={styles.cartViewDivider}/> : null}
                                <ListItem>
                                    <Typography className={styles.cartViewItemName} variant={"subtitle1"}>{"Total..."}</Typography>
                                    <Typography className={styles.cartViewItemTotal} variant={"subtitle1"}>{currencyFormatter.format(cartTotal / 100)}</Typography>
                                </ListItem>
                            </List>

                            <Button
                                className={styles.cartCheckOutBtn}
                                color={"primary"}
                                variant={"contained"}
                                onClick={() => {
                                    setPopoverOpen(false);
                                    navigate("/checkout/cart");
                                }}
                            >{"Check Out"}</Button>
                        </Paper>
                    </Popover>
                </Toolbar>
            </AppBar>

            {/* Drawer for Navigation */}
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} className={styles.drawer}>
                <List>
                    <NavListItem text={"Home"} url={"/home"}/>
                    <NavListItem text={"Account"} url={"/account"}/>
                    <ListItem button onClick={() => setCategoriesOpen(!categoriesOpen)}>
                        <ListItemText primary={"Categories"}/>
                        <ListItemIcon>{categoriesOpen ? <ExpandLess/> : <ExpandMore/>}</ListItemIcon>
                    </ListItem>
                    <Collapse in={categoriesOpen}>
                        <List component={"div"} className={styles.categoryList}>
                            {categories.map((category, index) => (
                                <NavListItem key={index} text={category.categoryName} url={"/category/" + category.categoryName.toLowerCase()}/>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </Drawer>
        </>
    )
};

export default Navigation;