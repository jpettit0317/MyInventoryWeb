import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import loginPageStyles from '../componentstyles/loginpagestyles';
import { withRouter, RouteComponentProps, Link, Redirect, useHistory } from 'react-router-dom';
import LoginPageViewModel from '../viewmodels/LoginPageViewModel';
import LoginNetworkCallManager from '../utils/LoginNetworkCallManager';
import FullApiURL from '../enums/FullApiURL_enum';
import { ContactSupportOutlined } from '@material-ui/icons';
import RoutePath from '../enums/RoutePath_enum';
interface LoginPageProps extends RouteComponentProps {
    username: string,
    password: string 
}

const LoginPage: React.FC<LoginPageProps> = props => {
    const signUpLink: string = "Don't have an account? Sign up!";
    const classes = loginPageStyles();
    const usernameId: string = "username";
    const passwordId: string = "password";
    const history = useHistory();

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState(props.password);
    const [usernameErrorFlag, setUsernameErrorFlag] = useState(false);
    const [shouldRedirectToMyInventory, setShouldRedirect] = useState(false);
    const [redirectDestination, setRedirectDestination] = useState("");

    function createLoginPageViewModel(): LoginPageViewModel {
        const loginNetworkCallManager = LoginNetworkCallManager.createLoginNetworkCallManager(FullApiURL.verifyUser);

        return LoginPageViewModel.createLoginPageViewModel(username, password, loginNetworkCallManager);
    }

    async function onSubmit() {
        const loginPageViewModel = createLoginPageViewModel();
        let result = loginPageViewModel.reportError();
        
        if (changeLoginState(result)) {
            return;
        }

        await loginPageViewModel.validateUserLogin().then(() => {
            setLoginErrorState(false, "");
            console.log("Transitioning to MyInventory page.");
            setRedirect({destination: RoutePath.myinventory, shouldRedirect: true});
        }).catch( (rejectReason: string) => {
            setLoginErrorState(true, rejectReason);
        });
    }

    function setRedirect(redirect: {destination: RoutePath, shouldRedirect: boolean}) {
        console.log(`Set redirect destination to ${redirect.destination}, shouldRedirect to ${redirect.shouldRedirect}`)
        setRedirectDestination(redirect.destination);
        setShouldRedirect(redirect.shouldRedirect);
    }

    function redirect() {
        if (shouldRedirectToMyInventory) {
            return <Redirect push to={redirectDestination} />
        }
    }

    function changeLoginState(state: {usernameError: string, passwordError: string}): boolean {
        if (state.usernameError !== "") {
            setUsernameErrorFlag(true);
            setUsernameError(state.usernameError);
        } else {
            setUsernameError("");
            setUsernameErrorFlag(false);
        }

        if (state.passwordError !== "") {
            console.log("Password error is " + state.passwordError)
            setPasswordError(state.passwordError);
        }

        return state.usernameError !== "" || state.passwordError !== "";
    }

    function setLoginErrorState(isUsernameInErrorState: boolean, passwordError: string = "") {
        if (isUsernameInErrorState) {
            setUsernameErrorFlag(true);
        } else {
            setUsernameErrorFlag(false);
        }
        setPasswordError(passwordError);
    }

    function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        if (event.target.id === usernameId) {
            const newUsername = event.target.value;
            setUsername(newUsername);
        } else if (event.target.id === passwordId) {
            const newPassword = event.target.value;
            setPassword(newPassword);
        }
    }

    function renderUsernameTextField(): JSX.Element {
        if (!usernameErrorFlag) {
            return renderNormalUsernameTextField();
        } else {
            return renderErrorUsernameTextField();
        }
    }

    function renderNormalUsernameTextField(): JSX.Element {
        return (
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoFocus
                onChange={onChange}
                id={usernameId}
                // value={loginPageViewModel.getUsername()}
            />
        );
    }

    function renderErrorUsernameTextField(): JSX.Element {
        return (
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoFocus
                onChange={onChange}
                id={usernameId}
                error
                helperText={usernameError}
                // value={loginPageViewModel.getUsername()}
            />
        );
    }

    function renderPasswordTextField(): JSX.Element {
        if (passwordError === "") {
            return renderNormalPasswordField();
        } else {
            return renderErrorPasswordField();
        }
    }

    function renderNormalPasswordField(): JSX.Element {
        return (
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={onChange}
                id={passwordId}
                // value={loginPageViewModel.getPassword()}
            />
        );
    }

    function renderErrorPasswordField(): JSX.Element {
        return (
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={onChange}
                id={passwordId}
                error
                helperText={passwordError}
                // value={loginPageViewModel.getPassword()}
            />
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {redirect()}
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    {renderUsernameTextField()} 
                    {renderPasswordTextField()} 
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to={RoutePath.signup}>
                                {signUpLink}
                            </Link>
                            <Link to={RoutePath.myinventory}>
                                MyInventory
                            </ Link> 
                        </Grid>
                    </Grid>
                </form>
            </div>
        </ Container>
    );
}

export default withRouter(LoginPage);