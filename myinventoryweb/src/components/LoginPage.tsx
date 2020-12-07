import React from 'react';
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

    function onSubmit() {

    }

    function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        if (event.target.id === usernameId) {
            const newUsername = event.target.value;
            loginPageViewModel.setUsername(newUsername);
        } else if (event.target.id === passwordId) {
            const newPassword = event.target.value;
            loginPageViewModel.setPassword(newPassword);
        }
        console.log("The props username is " + loginPageViewModel.getUsername());
        console.log("The props password is " + loginPageViewModel.getPassword());
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={onChange}
                        id={usernameId}
                    />
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
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
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