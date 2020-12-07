import LoginPageViewModel from '../../../viewmodels/LoginPageViewModel';

describe("LoginPageViewModel tests", () => {
    const login = {
        username: "username",
        password: "password"
    };

    it('username and password should be blank when no arguments are passed in', () => {
        const emptyLoginPageViewModel = LoginPageViewModel.createLoginPageViewModel();
        const actualUsername = emptyLoginPageViewModel.getUsername();
        const actualPassword = emptyLoginPageViewModel.getPassword();

        expect(actualUsername).toBe("");

        expect(actualPassword).toBe("");
    });

    it('setUsername should change the username', () => {
        const expectedUsername = "username";
        const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel();

        loginPageViewModel.setUsername(expectedUsername);
        const actualUsername = loginPageViewModel.getUsername();

        expect(actualUsername).toBe(expectedUsername);
    });

    it('setPassword should change the password', () => {
        const expectedPassword = "password";
        const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel();

        loginPageViewModel.setPassword(expectedPassword);
        const actualPassword = loginPageViewModel.getPassword();

        expect(actualPassword).toBe(expectedPassword);
    });
    
    it('createLoginPageViewModel should intialize username and password', () => {
        const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel(login.username, 
            login.password);

        const actualLogin = {
            username: loginPageViewModel.getUsername(),
            password: loginPageViewModel.getPassword()
        };

        expect(actualLogin.username).toBe(login.username);
        expect(actualLogin.password).toBe(login.password);
    });

    it('reportError should return an empty string if there is nothing wrong with username or password', () => {
        const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel(login.username, 
            login.password);
        const actualError = loginPageViewModel.reportError();

        expect(actualError.usernameError).toBe("");
        expect(actualError.passwordError).toBe("");
    });

    it('reportError should return an error if there is nothing in username', () => {
        const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel("",
            login.password);
        const actualError = loginPageViewModel.reportError();

        expect(actualError.usernameError).toBe(loginPageViewModel.emptyUsernameError);
        expect(actualError.passwordError).toBe("");
    });

    it('reportError should return an error if there is nothing in password.', () => {
        const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel(login.username,
            "");
        const actualError = loginPageViewModel.reportError();

        expect(actualError.usernameError).toBe("");
        expect(actualError.passwordError).toBe(loginPageViewModel.emptyPasswordError); 
    });
});