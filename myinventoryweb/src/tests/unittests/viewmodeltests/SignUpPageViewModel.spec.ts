import SignUpPageViewModel from '../../../viewmodels/SignUpPageViewModel';
import * as TestUtils from "../../testutils/SignUpPageViewModelTestUtils";
import SignUpViewErrors from "../../../typeDefs/SignUpViewErrors";

describe('SignUpPageViewModel tests', () => {
    describe('Constructor tests', () => {
        it('when nothing is passed in, getters and setters should return empty', () => {
            const viewModel = TestUtils.createSignUpPageViewModel(TestUtils.emptyProps);

            TestUtils.verifyViewModelIsEqualToProps(viewModel, TestUtils.emptyProps);
        });

        it("when the createEmptyViewModel is called, getters and setters should return empty", () => {
            const viewModel = TestUtils.createEmptySignUpPageViewModel();

            TestUtils.verifyViewModelIsEqualToProps(viewModel, TestUtils.emptyProps);
        });

        it("when everything is passed in, getters should return the value they were set to", () => {
            const viewModel = TestUtils.createSignUpPageViewModel(TestUtils.validProps);

            TestUtils.verifyViewModelIsEqualToProps(viewModel, TestUtils.validProps);
        });

        it('setters should change values', ()=> {
            const viewModel = TestUtils.createEmptySignUpPageViewModel();
            const changeProps = TestUtils.validProps;

            viewModel.setEmailAddress(changeProps.email);
            viewModel.setConfirmedPassword(changeProps.passwords.confirmedPassword);
            viewModel.setPassword(changeProps.passwords.password);
            viewModel.setUsername(changeProps.username);
            viewModel.setFirstName(changeProps.fullName.firstName);
            viewModel.setLastName(changeProps.fullName.lastName);

            TestUtils.verifyViewModelIsEqualToProps(viewModel, changeProps);
        });
    });

    describe('reportError', () => {
        it("when everything is filled in reportError shouldn't return an error", () => {
            const sut = TestUtils.createSignUpPageViewModel(TestUtils.validProps);

            const actualError = sut.reportError();

            TestUtils.verifyError(actualError, TestUtils.noErrors);
        });

        it('when nothing is filled in, all fields should have an error', () => {
            const sut = TestUtils.createSignUpPageViewModel(TestUtils.emptyProps);

            const actualError = sut.reportError();

            TestUtils.verifyError(actualError, TestUtils.emptyFieldError);
        });

        it('when username is not filled in, username field should report an error', () => {
            const sut = TestUtils.createSignUpPageViewModel(TestUtils.emptyUsername);
            const errors: SignUpViewErrors = {
                ...TestUtils.noErrors,
                usernameError: TestUtils.emptyFieldError.usernameError 
            }
           
            const actualError = sut.reportError();
            
            TestUtils.verifyError(actualError, errors);
        });

        it('when password is not filled in, password field should report an empty field error', () => {
            const sut = TestUtils.createSignUpPageViewModel(TestUtils.emptyPassword);
            
            const emptyPasswordError = {
                passwordError: TestUtils.emptyFieldError.passwordErrors.passwordError,
                confirmedPasswordError: ""
            };

            const emptyPasswordErrors: SignUpViewErrors = {
                ...TestUtils.noErrors,
                passwordErrors: emptyPasswordError 
            };

            const actualPasswordError = sut.reportError();

            TestUtils.verifyError(actualPasswordError, emptyPasswordErrors);
        });

        it('when first name is not filled in, firstname field should return an empty field error', () => {
            const sut = TestUtils.createSignUpPageViewModel(TestUtils.emptyFirstName);
            const emptyFirstName = {
                firstNameError: TestUtils.emptyFieldError.fullNameErrors.firstNameError,
                lastNameError: ""
            };
            
            const emptyFirstNameErrors: SignUpViewErrors = {
                ...TestUtils.noErrors,
                fullNameErrors: emptyFirstName
            };

            const actualPasswordError = sut.reportError();

            TestUtils.verifyError(actualPasswordError, emptyFirstNameErrors);
        });

        it('when last name is not filled in, lastname field should return an empty field error', () => {
            const sut = TestUtils.createSignUpPageViewModel(TestUtils.emptyLastName);
            
            const invalidLastName = {
                firstNameError: "",
                lastNameError: TestUtils.emptyFieldError.fullNameErrors.lastNameError
            };

            const emptyLastNameErrors: SignUpViewErrors = {
                ...TestUtils.noErrors,
                fullNameErrors: invalidLastName
            };

            const actualLastNameErrors = sut.reportError();

            TestUtils.verifyError(actualLastNameErrors, emptyLastNameErrors);
        });

        it('when confirm password is not filled in, confirm password field should return an empty field error', () => {
            const sut = TestUtils.createSignUpPageViewModel(TestUtils.emptyConfirmedPassword);

            const invalidConfirmPassword = {
                passwordError: "",
                confirmedPasswordError: TestUtils.emptyFieldError.passwordErrors.confirmedPasswordError
            };

            const emptyConfPasswordErrors: SignUpViewErrors = {
                ...TestUtils.noErrors,
                passwordErrors: invalidConfirmPassword
            };

            const actualErrors = sut.reportError();

            TestUtils.verifyError(actualErrors, emptyConfPasswordErrors);
        });

        it('when email is not filled in, email field should display an empty field error', () => {
            const sut = TestUtils.createSignUpPageViewModel(TestUtils.emptyEmail);

            const emptyEmailErrors = {
                ...TestUtils.noErrors,
                emailError: TestUtils.emptyFieldError.emailError                
            };

            const actualErrors = sut.reportError();

            TestUtils.verifyError(actualErrors, emptyEmailErrors);
        });

        it("when confirm password does not match, confirm password should display a password doesn't match error", () => {
            const sut = TestUtils.createSignUpPageViewModel(TestUtils.nonMatchingPasswordProps);

            const nonMatchingPasswordError = {
                passwordError: "",
                confirmedPasswordError: TestUtils.nonMatchingPasswordsError
            };

            const noPasswordMatchErrors = {
                ...TestUtils.noErrors,
                passwordErrors: nonMatchingPasswordError
            };

            const actualErrors = sut.reportError();

            TestUtils.verifyError(actualErrors, noPasswordMatchErrors);
        });
    });

    describe('Are there errors tests', () => {
        it('when there are no errors areThereErrors should return false', () => {
            const networkManager = TestUtils.MockSignUpNetworkCallManager.createMock("", "");
            const sut = TestUtils.createSignUpPageViewModel(TestUtils.validProps, networkManager);

            const errors = sut.reportError();

            const result = sut.areThereErrors(errors);

            TestUtils.verifyAreThereErrors([result, false]); 
        });

        it('when there are errors, areThereErrors should return true', () => {
            const networkManager = TestUtils.MockSignUpNetworkCallManager.createMock("", "");
            const sut = TestUtils.createSignUpPageViewModel(TestUtils.emptyProps, networkManager);

            const errors = sut.reportError();

            const result = sut.areThereErrors(errors);

            TestUtils.verifyAreThereErrors([result, true]);
        });
    });
});