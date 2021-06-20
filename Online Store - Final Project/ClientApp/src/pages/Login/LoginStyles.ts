import { makeStyles } from "@material-ui/core";

const loginStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        alignSelf: 'center'
    },
    spacer: {
        height: '15px'
    },
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '25vw',
        margin: '15vh auto auto auto',
        padding: '20px'
    }
}));

export default loginStyles;