import React, { useState } from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import SignUpPageViewModel from '../viewmodels/SignUpPageViewModel';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import SignUpViewErrors from '../typeDefs/SignUpViewErrors';
import { ErrorSharp } from "@material-ui/icons";
import SignUpViewModelProps from "../typeDefs/SignUpViewModelProps";
import SignUpNetworkCallManager from "../utils/SignUpNetworkCallManager";
import FullApiURL from "../enums/FullApiURL_enum";
import NetworkCallManager from "../interfaces/modelinterfaces/NetworkCallManager";
import { removeDoubleQuotesFromString } from "../utils/StringUtil";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface SignUpPageProps extends RouteComponentProps {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    confirmedPassword: string
}

const SignUpPage: React.FC<SignUpPageProps> = props => {
    const classes = useStyles();
    const textFieldIds = {
        firstNameId: "firstName",
        lastNameId: "lastName",
        usernameId: "username",
        emailId: "email",
        passwordId: "password",
        confirmPasswordId: "confirmpassword"
    };

    enum TextFieldNames {
        firstName,
        lastName,
        userName,
        email,
        password,
        confirmPassword
    };

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [userNameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmedPasswordError] = useState("");

    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [username, setUsername] = useState(props.username);
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState(props.password);
    const [confirmedPassword, setConfirmedPassword] = useState(props.confirmedPassword);

    function onClick() {
        const viewModelProps: SignUpViewModelProps = {
            username: username,
            passwords: {password: password, confirmedPassword: confirmedPassword},
            email: email,
            fullName: {firstName: firstName, lastName: lastName}
        };
        const signUpNetworkCallManager = SignUpNetworkCallManager.createNetworkManager(FullApiURL.createUser);
        
        sendUserSignUpOverNetwork(viewModelProps, signUpNetworkCallManager);
    }

    function sendUserSignUpOverNetwork(viewModelProps: SignUpViewModelProps, networkCallManager: SignUpNetworkCallManager) {
        const signUpPageViewModel = SignUpPageViewModel.createViewModel(viewModelProps, networkCallManager);
        const currentErrors = signUpPageViewModel.reportError();
        
        updateErrors(currentErrors);

        if (areThereErrors(currentErrors)) {
            return;
        }

        const userInfo = signUpPageViewModel.getUserInfo();

        signUpPageViewModel.signUpNetworkCallManager.sendCreateUserRequest(userInfo).then((result) => {
            console.log("No error found");
        }).catch((error) => {
            const errorValue = removeDoubleQuotesFromString(String(error));
            if (errorValue === "Error: Network Error") {
                alert("There was a network error. Please try again later.");
            } else {
                setUsernameError(errorValue);
            }
        });
    }

    function updateErrors(errors: SignUpViewErrors) {
        setFirstNameError(errors.fullNameErrors.firstNameError);
        setLastNameError(errors.fullNameErrors.lastNameError);
        setUsernameError(errors.usernameError);
        setEmailError(errors.emailError);
        setPasswordError(errors.passwordErrors.passwordError);
        setConfirmedPasswordError(errors.passwordErrors.confirmedPasswordError);
    }

    function areThereErrors(errors: SignUpViewErrors): boolean {
        if (areThereFullNameErrors(errors.fullNameErrors)) {
            return true;
        } else if (areTherePasswordErrors(errors.passwordErrors)) {
            return true;
        } else if (errors.usernameError !== "") {
            return true;
        } else if (errors.emailError !== "") {
            return true;
        }
        return false;
    }

    function areThereFullNameErrors(fullNameErrors: {firstNameError: string, lastNameError: string}): boolean {
        return fullNameErrors.firstNameError !== "" || fullNameErrors.lastNameError !== "";
    }

    function areTherePasswordErrors(passwordErrors: {passwordError: string, confirmedPasswordError: string}): boolean {
        return passwordErrors.passwordError !== "" || passwordErrors.confirmedPasswordError !== "";
    }

    function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const [targetId, targetValue] = [event.target.id, event.target.value];

        console.log(`Field Id: ${targetId}, Value: ${targetValue}`);

        if (targetId === textFieldIds.firstNameId) {
            updateFirstName(targetValue);
        } else if (targetId === textFieldIds.lastNameId) {
            updateLastName(targetValue);
        } else if (targetId === textFieldIds.usernameId) {
            updateUsername(targetValue);
        } else if (targetId === textFieldIds.emailId) {
            updateEmail(targetValue);
        } else if (targetId === textFieldIds.passwordId) {
            updatePassword(targetValue);
        } else if (targetId === textFieldIds.confirmPasswordId) {
            updateConfirmPassword(targetValue);
        }
    }

    function updateFirstName(newName: string) {
        setFirstName(newName);
    }

    function updateLastName(newLastName: string) {
        setLastName(newLastName);
    }

    function updateEmail(newEmail: string) {
        setEmail(newEmail);
    }

    function updateUsername(newUsername: string) {
        setUsername(newUsername);
    }

    function updatePassword(newPassword: string) {
        setPassword(newPassword);
    }

    function updateConfirmPassword(newPassword: string) {
        setConfirmedPassword(newPassword);
    }

    function renderFirstnameField(): JSX.Element {
        if (firstNameError === "") {
            return renderNormalFirstNameField();
        } else {
            return renderErrorFirstNameField();
        }
    }

    function renderNormalFirstNameField(): JSX.Element {
        return (
            <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={onChange}
                autoFocus
            />
        );
    }

    function renderErrorFirstNameField(): JSX.Element {
        return (
            <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={onChange}
                autoFocus
                error
                helperText={firstNameError}
            />
        );
    }

    function renderLastnameField(): JSX.Element {
        if (lastNameError === "") {
            return renderNormalLastNameField();
        } else {
            return renderErrorLastNameField();
        }
    }

    function renderNormalLastNameField(): JSX.Element {
        return (
            <TextField
                autoComplete="lname"
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id={textFieldIds.lastNameId}
                label="Last Name"
                onChange={onChange}
            />
        );
    }

    function renderErrorLastNameField(): JSX.Element {
        return (
            <TextField
                autoComplete="lname"
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id={textFieldIds.lastNameId}
                label="Last Name"
                onChange={onChange}
                error
                helperText={lastNameError}
            />
        );
    }

    function renderEmailField(): JSX.Element {
        if (emailError === "") {
            return renderNormalEmailField();
        } else {
            return renderErrorEmailField();
        }
    }

    function renderNormalEmailField(): JSX.Element {
        return (
            <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id={textFieldIds.emailId}
                label="Email"
                onChange={onChange}
            />
        );
    }

    function renderErrorEmailField(): JSX.Element {
        return (
            <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id={textFieldIds.emailId}
                label="Email"
                onChange={onChange}
                error
                helperText={emailError}
            />
        );
    }

    function renderUsernameField(): JSX.Element {
        if (userNameError === "") {
            return renderNormalUserameField();
        } else {
            return renderErrorUserameField();
        }
    }

    function renderNormalUserameField(): JSX.Element {
        return (
            <TextField
                autoComplete="uname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id={textFieldIds.usernameId}
                label="Username"
                onChange={onChange}
            />
        );
    }

    function renderErrorUserameField(): JSX.Element {
        return (
            <TextField
                autoComplete="uname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id={textFieldIds.usernameId}
                label="Username"
                onChange={onChange}
                error
                helperText={userNameError}
            />
        );
    }

    function renderPasswordField(): JSX.Element {
        if (passwordError === "") {
            return renderNormalPasswordField();
        } else {
            return renderErrorPasswordField();
        }
    }

    function renderNormalPasswordField(): JSX.Element {
        return (
            <TextField
                autoComplete="password"
                name="password"
                variant="outlined"
                required
                fullWidth
                id={textFieldIds.passwordId}
                label="Password"
                onChange={onChange}
                type="password"
            />
        );
    }

    function renderErrorPasswordField(): JSX.Element {
        return (
            <TextField
                autoComplete="password"
                name="password"
                variant="outlined"
                required
                fullWidth
                id={textFieldIds.passwordId}
                label="Password"
                onChange={onChange}
                error
                helperText={passwordError}
                type="password"
            />
        );
    }

    function renderConfirmPasswordField(): JSX.Element {
        if (passwordError === "") {
            return renderNormalConfirmPasswordField();
        } else {
            return renderErrorConfirmPasswordField();
        }
    }

    function renderNormalConfirmPasswordField(): JSX.Element {
        return (
            <TextField
                autoComplete="password"
                name="confirmpassword"
                variant="outlined"
                required
                fullWidth
                id={textFieldIds.confirmPasswordId}
                label="Confirm Password"
                onChange={onChange}
                type="password"
            />
        );
    }

    function renderErrorConfirmPasswordField(): JSX.Element {
        return (
            <TextField
                autoComplete="password"
                name="confirmpassword"
                variant="outlined"
                required
                fullWidth
                id={textFieldIds.confirmPasswordId}
                label="Confirm Password"
                onChange={onChange}
                error
                helperText={confirmPasswordError}
                type="password"
            />
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                           {renderFirstnameField()} 
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           {renderLastnameField()}
                        </Grid>
                        <Grid item xs={12}>
                            {renderUsernameField()}
                        </Grid>
                        <Grid item xs={12}>
                            {renderEmailField()} 
                        </Grid>
                        <Grid item xs={12}>
                            {renderPasswordField()} 
                        </Grid>
                        <Grid item xs={12}>
                            {renderConfirmPasswordField()} 
                        </Grid>
                    </Grid>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onClick}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default withRouter(SignUpPage);