import LoginPageViewModel from '../../../viewmodels/LoginPageViewModel';
import LoginNetworkCallManager from '../../../utils/LoginNetworkCallManager';
import UserPasswordInfo from '../../../interfaces/modelinterfaces/UserPasswordInfo';

describe("LoginPageViewModel tests", () => {
    interface MockLoginNetworkCallManagerProps {
        readonly result: boolean;
        readonly message: string;
        readonly shouldReject: boolean;
        readonly url: string;
    }
    class MockLoginNetworkCallManager extends LoginNetworkCallManager {
        private result: boolean;
        private message: string;
        private shouldReject: boolean;

        private constructor(props: MockLoginNetworkCallManagerProps) {
            super(props.url);
            this.result = props.result;
            this.message = props.message;
            this.shouldReject = props.shouldReject;
        }

        static createMockLoginNetworkCallManager(props: MockLoginNetworkCallManagerProps): MockLoginNetworkCallManager {
            return new MockLoginNetworkCallManager(props);
        }

        sendVerifyUserRequest(loginInfo: UserPasswordInfo): Promise<{result: boolean, reason: string}> {
            return new Promise( (resolve, reject) => {
                if (!this.shouldReject) {
                    resolve({result: true, reason: this.message});
                } else {
                    reject({result: false, reason: this.message});
                }
            });
        }
    }
    const login = {
        username: "username",
        password: "password"
    };

    const emptyProps: MockLoginNetworkCallManagerProps = {
        result: true,
        message: "",
        shouldReject: false,
        url: ""
    };

    it('username and password should be blank when no arguments are passed in', () => {
        const mockNetworkCallManager = MockLoginNetworkCallManager.createMockLoginNetworkCallManager(emptyProps)
        const emptyLoginPageViewModel = LoginPageViewModel.createLoginPageViewModel("", "", mockNetworkCallManager);
        const actualUsername = emptyLoginPageViewModel.getUsername();
        const actualPassword = emptyLoginPageViewModel.getPassword();

        expect(actualUsername).toBe("");

        expect(actualPassword).toBe("");
    });

    it('setUsername should change the username', () => {
        const mockNetworkCallManager = MockLoginNetworkCallManager.createMockLoginNetworkCallManager(emptyProps);
        const expectedUsername = "username";
        const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel("", "", mockNetworkCallManager);

        loginPageViewModel.setUsername(expectedUsername);
        const actualUsername = loginPageViewModel.getUsername();

        expect(actualUsername).toBe(expectedUsername);
    });

    it('setPassword should change the password', () => {
        const mockNetworkCallManager = MockLoginNetworkCallManager.createMockLoginNetworkCallManager(emptyProps);
        const expectedPassword = "password";
        const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel("", "", mockNetworkCallManager);

        loginPageViewModel.setPassword(expectedPassword);
        const actualPassword = loginPageViewModel.getPassword();

        expect(actualPassword).toBe(expectedPassword);
    });
    
    it('createLoginPageViewModel should intialize username and password', () => {
        const mockNetworkCallManager = MockLoginNetworkCallManager.createMockLoginNetworkCallManager(emptyProps);
        const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel(login.username, 
            login.password, mockNetworkCallManager);

        const actualLogin = {
            username: loginPageViewModel.getUsername(),
            password: loginPageViewModel.getPassword()
        };

        expect(actualLogin.username).toBe(login.username);
        expect(actualLogin.password).toBe(login.password);
    });

    it('reportError should return an empty string if there is nothing wrong with username or password', () => {
        const mockNetworkCallManager = MockLoginNetworkCallManager.createMockLoginNetworkCallManager(emptyProps);
        const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel(login.username, 
            login.password, mockNetworkCallManager);
        const actualError = loginPageViewModel.reportError();

        expect(actualError.usernameError).toBe("");
        expect(actualError.passwordError).toBe("");
    });

    it('reportError should return an error if there is nothing in username', () => {
        const mockNetworkCallManager = MockLoginNetworkCallManager.createMockLoginNetworkCallManager(emptyProps);
        const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel("",
            login.password, mockNetworkCallManager);
        const actualError = loginPageViewModel.reportError();

        expect(actualError.usernameError).toBe(loginPageViewModel.emptyUsernameError);
        expect(actualError.passwordError).toBe("");
    });

    it('reportError should return an error if there is nothing in password.', () => {
        const mockNetworkCallManager = MockLoginNetworkCallManager.createMockLoginNetworkCallManager(emptyProps);
        const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel(login.username,
            "", mockNetworkCallManager);
        const actualError = loginPageViewModel.reportError();

        expect(actualError.usernameError).toBe("");
        expect(actualError.passwordError).toBe(loginPageViewModel.emptyPasswordError); 
    });

    it('reportError should return two errors if there is nothing in username or password', () => {
        const mockNetworkCallManager = MockLoginNetworkCallManager.createMockLoginNetworkCallManager(emptyProps);
        const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel("", "", mockNetworkCallManager);
        
        const actualError = loginPageViewModel.reportError();

        expect(actualError.usernameError).toBe(loginPageViewModel.emptyUsernameError);
        expect(actualError.passwordError).toBe(loginPageViewModel.emptyPasswordError);
    });
});