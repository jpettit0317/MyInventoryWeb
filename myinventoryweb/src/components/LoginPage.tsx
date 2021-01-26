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
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import LoginPageViewModel from '../viewmodels/LoginPageViewModel';

interface LoginPageProps extends RouteComponentProps {
    loginPageViewModel: LoginPageViewModel; 
}

const LoginPage: React.FC<LoginPageProps> = props => {
    const signUpLink: string = "Don't have an account? Sign up!";
    const classes = loginPageStyles();
    const usernameId: string = "username";
    const passwordId: string = "password";

    let loginPageViewModel = props.loginPageViewModel;
    
    const [errors, setErrors] = useState({usernameError: "", passwordError: ""});

    async function onSubmit() {
        let result = loginPageViewModel.reportError();
        const loginInfo = {username: loginPageViewModel.getUsername(),
                           password: loginPageViewModel.getPassword()};

        console.log("On submit " + " username: " + loginInfo.username + " password: " + loginInfo.password);

        await loginPageViewModel.validateUserLogin().then(() => {
            console.log("Nothing went wrong");
        }).catch( (rejectReason: string) => {
            console.log("Reason for rejction " + rejectReason);
            result.passwordError = rejectReason;
            console.log("Setting password error");
        });

        setErrors(result);
    }

    function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        console.log("Changing");
        if (event.target.id === usernameId) {
            const newUsername = event.target.value;
            loginPageViewModel.setUsername(newUsername);
            console.log("The new username is " + loginPageViewModel.getUsername());
        } else if (event.target.id === passwordId) {
            const newPassword = event.target.value;
            loginPageViewModel.setPassword(newPassword);
            console.log("The new password is " + loginPageViewModel.getPassword());
        }
    }

    function renderUsernameTextField(): JSX.Element {
        if (errors.usernameError === "") {
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
                helperText="Username must be filled in."
                // value={loginPageViewModel.getUsername()}
            />
        );
    }

    function renderPasswordTextField(): JSX.Element {
        if (errors.passwordError === "") {
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
                helperText="Password must be filled in."
                // value={loginPageViewModel.getPassword()}
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
                            <Link to="/signup">
                                {signUpLink}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </ Container>
    );
}

export default withRouter(LoginPage);