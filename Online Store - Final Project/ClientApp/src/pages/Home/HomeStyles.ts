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
        height: '150px'
    },
    categoryCardDescription: {
        marginRight: '10px'
    }
}));

export default homeStyles;