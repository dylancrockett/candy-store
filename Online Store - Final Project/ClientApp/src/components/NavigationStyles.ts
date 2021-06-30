import { makeStyles } from "@material-ui/core";

const navigationStyles = makeStyles((theme) => ({
    accountBtn: {
        margin: 'auto 10px auto auto'
    },
    shoppingCartBtn: {
        margin: 'auto 10px auto 10px'
    },
    drawer: {
        "& .MuiDrawer-paper": {
            minWidth: '15vw'
        }
    },
    categoryList: {
        marginLeft: '25px'
    },
    cartViewDivider: {
        margin: '0 10px 0 40px'
    },
    cartViewItemName: {
        marginRight: '10px'
    },
    cartViewItemTotal: {
        marginLeft: 'auto'
    },
    cartCheckOutBtn: {
        margin: '5px',
        width: '-webkit-fill-available'
    }
}));

export default navigationStyles;