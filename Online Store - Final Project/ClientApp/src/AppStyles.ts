import { makeStyles } from "@material-ui/core";

const appStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },   
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
    }
}));

export default appStyles;