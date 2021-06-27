import { AppBar, Badge, Button, IconButton, Toolbar, TextField, InputAdornment, Drawer, Collapse, ListItemIcon } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from 'react-redux';
import { getShoppingCartItemCount } from '../redux/slices/shoppingCartSlice';
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

const Navigation = () => {
    //component styling
    const styles = navigationStyles();

    //use navigate from react router
    const navigate = useNavigate();

    //number of items in the user's shopping cart
    const itemsInCart = useSelector(getShoppingCartItemCount); 

    //get if the user is logged in
    const loggedIn = useSelector(getLoggedIn);

    //drawer open state
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    //if the categories list is open
    const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);

    //get search items
    const searchItems = useSelector(getSearchItems);

    //get categories
    const categories = useSelector(getCategories);

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
                                <NavListItem text={category.categoryName} url={"/category/" + category.categoryName.toLowerCase()}/>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </Drawer>
        </>
    )
};

export default Navigation;