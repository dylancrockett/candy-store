import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import loginStyles from './LoginStyles';
import validator from 'validator';
import passwordValidator from 'password-validator';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { getLoggedIn, setLoggedIn } from '../../redux/slices/authSlice';
import { useAppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

//login form type
interface LoginForm {
    username: string,
    password: string
}

//new account form type
interface NewAccountForm {
    username: string,
    password: string,
    email: string
}

//password validator schema
let passwordSchema = (
    (new passwordValidator())
    .is().min(8)
    .is().max(32)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
);

//login component
const Login = () => {
    //component styling
    const styles = loginStyles();

    //use snackbar
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    //use dispatch
    const dispatch = useDispatch();

    //use navigate
    const navigate = useNavigate();

    //logged in value 
    const loggedIn = useSelector(getLoggedIn);

    //check if loggedIn status changes, if it is true navigate to home
    useEffect(() => {
        if (loggedIn) navigate("/home");
    }, [loggedIn]);

    //login form fields
    const [loginData, setLoginData] = useState<LoginForm>({ username: "", password: "" });

    //new account form fields
    const [newAccountData, setNewAccountData] = useState<NewAccountForm>();

    //password doublecheck field for making a new account
    const [passwordCheck, setPasswordCheck] = useState<string>("");

    //handle input change for login form
    const handeLoginChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    //handle input change for new account form
    const handeNewAccountChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (newAccountData === undefined) return;

        setNewAccountData({
            ...newAccountData,
            [e.target.name]: e.target.value
        })
    }

    //check if the new account form is filled out valid-ly and can be subbmitted
    const checkNewAccountFormIsValid = () => {
        if (newAccountData === undefined) return false;

        //check if email is a valid field
        if (!validator.isEmail(newAccountData.email)) return false;
        
        //check username length (must be >= 5) and only contain spaces
        if (newAccountData.username.length < 5 || !validator.isAlphanumeric(newAccountData.username)) return false;

        //ensure secure password
        if (!passwordSchema.validate(newAccountData.password)) return false;

        return true;
    } 

    //get memoized value of checkNewAccountFormIsValid
    const newAccountFormIsValid = useMemo(checkNewAccountFormIsValid, [newAccountData]);

    //get password help text
    const getPasswordHelpText = () => {
        if (newAccountData === undefined || newAccountData.password === "") return "*Required";
        const failedRules = passwordSchema.validate(newAccountData.password, { list: true });

        if (failedRules.includes("min")) return "Must be at least 8 characters.";
        else if (failedRules.includes("max")) return "Cannot be longer than 32 characters.";
        else if (failedRules.includes("uppercase")) return "Requires 1 uppercase character.";
        else if (failedRules.includes("lowercase")) return "Requires 1 lowercase character.";
        else if (failedRules.includes("digits")) return "Requires at least 1 digit.";
        else return "*Required";
    };

    //submit login to server
    const submitLogin = () => {
        axios({
            method: 'post',
            url: 'api/auth/login',
            data: {
                username: loginData.username,
                password: loginData.password
            }
        })
        .then(() => {
            enqueueSnackbar("Signed in successfuly.", { variant: "success" });

            //update redux
            dispatch(setLoggedIn(true));
        })
        .catch(() => {
            enqueueSnackbar("Invalid login credentials.", { variant: "error" });
        });
    }

    //submit new account to server
    const submitCreateAccount = () => {
        if (newAccountData === undefined) return;

        axios({
            method: 'post',
            url: 'api/auth/new-account',
            data: {
                username: newAccountData.username,
                email: newAccountData.email,
                password: newAccountData.password,
            }
        })
        .then(() => {
            enqueueSnackbar("Created new account successfuly.", { variant: "success" });

            //update redux
            dispatch(setLoggedIn(true));
        })
        .catch(() => {
            enqueueSnackbar("Unable to create account.", { variant: "error" });
        });
    }

    //passwordHelpText as a memoized value
    const passwordHelpText = useMemo(getPasswordHelpText, [newAccountData]);

    return (
        <div className={styles.loginContainer}>
            {newAccountData ? (
                <>
                    {/* New Account Form */}
                    <Typography variant={"h5"} className={styles.title}>{"Create a New Account"}</Typography>
                    <div className={styles.spacer}/>

                    {/* Username Field */}
                    <TextField
                        label={"Username"}
                        name={"username"}
                        variant={"outlined"}
                        value={newAccountData.username}
                        error={newAccountData.username.length < 5 || newAccountData.username.indexOf(' ') >= 0}
                        helperText={newAccountData.username.length < 5 || !validator.isAlphanumeric(newAccountData.username) ? (newAccountData.username.length < 5) ? "Too short." : "Must be alphanumeric." : "*Required"}
                        onChange={e => handeNewAccountChange(e)}
                    />
                    <div className={styles.spacer}/>

                    {/* Email Field */}
                    <TextField
                        label={"Email"}
                        name={"email"}
                        variant={"outlined"}
                        value={newAccountData.email}
                        error={ newAccountData.email !== "" && !validator.isEmail(newAccountData.email)}
                        helperText={newAccountData.email !== "" && !validator.isEmail(newAccountData.email) ? "Invalid Email." : "*Required"}
                        onChange={e => handeNewAccountChange(e)}
                    />
                    <div className={styles.spacer}/>

                    {/* Password Field */}
                    <TextField
                        label={"Password"}
                        name={"password"}
                        variant={"outlined"}
                        type={"password"}
                        value={newAccountData.password}
                        error={passwordHelpText !== "*Required"}
                        helperText={passwordHelpText}
                        onChange={e => handeNewAccountChange(e)}
                    />
                    <div className={styles.spacer}/>

                    {/* Create Account Button */}
                    <Button
                        disabled={!newAccountFormIsValid}
                        color={"primary"}
                        variant={"contained"}
                        onClick={submitCreateAccount}
                    >{"Create Account"}</Button>
                </>
            ): (
                <>
                    {/* Login Form */}
                    <Typography variant={"h5"} className={styles.title}>{"Sign In to your Account"}</Typography>
                    <div className={styles.spacer}/>

                    {/* Username */}
                    <TextField
                        label={"Username"}
                        name={"username"}
                        variant={"outlined"}
                        value={loginData.username}
                        onChange={e => handeLoginChange(e)}
                    />
                    <div className={styles.spacer}/>

                    {/* Password Field */}
                    <TextField
                        label={"Password"}
                        name={"password"}
                        variant={"outlined"}
                        type={"password"}
                        value={loginData.password}
                        onChange={e => handeLoginChange(e)}
                    />
                    <div className={styles.spacer}/>

                    {/* Login Button */}
                    <Button
                        color={"primary"}
                        variant={"contained"}
                        onClick={submitLogin}
                    >{"Sign In"}</Button>
                    <div className={styles.spacer}/>
                    <Button
                        color={"secondary"}
                        variant={"contained"}
                        onClick={() => navigate("/home")}
                    >{"Cancel"}</Button>
                    <div className={styles.spacer}/>
                    <div className={styles.spacer}/>
                    
                    {/* Create Account Button */}
                    <Typography>{"Don't have an account?"}</Typography>
                    <Button
                        color={"default"}
                        variant={"contained"}
                        onClick={() => setNewAccountData({ username: "", password: "", email: ""})}
                    >{"Create Account"}</Button>
                </>
            )}
        </div>
    );
};

export default Login;