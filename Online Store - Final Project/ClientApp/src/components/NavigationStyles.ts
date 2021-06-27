import { makeStyles } from "@material-ui/core";

const navigationStyles = makeStyles((theme) => ({
    accountBtn: {
        color: "#FFF",
        margin: 'auto 10px auto auto'
    },
    shoppingCartBtn: {
        color: "#FFF",
        margin: 'auto 10px auto 10px'
    },
    drawer: {
        "& .MuiDrawer-paper": {
            minWidth: '15vw'
        }
    },
    categoryList: {
        marginLeft: '25px'
    }
}));

export default navigationStyles;