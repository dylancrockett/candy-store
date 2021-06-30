import { makeStyles } from "@material-ui/core";

const homeStyles = makeStyles((theme) => ({
    categoryContainer: {
        margin: '20px',
    },
    categoryTitle: {
        fontWeight: 'bold',
        marginBottom: '10px'
    },
    categoryCardMedia: {
        minHeight: '150px'
    },
    categoryCardDescription: {
        marginRight: '10px'
    },
    gridItem: {
        display: 'flex'
    },
    gridCard: {
        flex: '1'
    }
}));

export default homeStyles;