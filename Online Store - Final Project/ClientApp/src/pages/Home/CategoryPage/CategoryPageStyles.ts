import { makeStyles } from "@material-ui/core";

const categoryPageStyles = makeStyles((theme) => ({
    container: {
        margin: '20px',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: '10px'
    },
    gridItem: {
        display: 'flex'
    },
}));

export default categoryPageStyles;