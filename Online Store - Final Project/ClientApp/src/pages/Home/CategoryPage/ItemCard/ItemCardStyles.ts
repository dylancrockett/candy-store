import { makeStyles, lighten } from "@material-ui/core";

const itemCardStyles = makeStyles((theme) => ({
    gridCard: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        minHeight: '150px'
    },
    cardDescription: {
        height: '-webkit-fill-available',
    },
    itemCost: {
        display: 'flex'
    },
    itemCostLabel: {
        fontWeight: 'bold',
        marginRight: '5px'
    },
    amountController: {
        marginLeft: 'auto!important',
    },
    amountText: {
        "& .MuiButton-label": {
            color: theme.palette.text.primary
        }
    },
    amountTextD: {
        backgroundColor: lighten(theme.palette.info.main, 0.3) + "!important",
    },
    amountBtn: {
        background: theme.palette.type === "light" ? "#EEE" : theme.palette.grey.A200,
        "& .MuiButton-label": {
            color: theme.palette.primary.main,
        }
    }
}));

export default itemCardStyles;