type SignUpViewErrors = {
    usernameError: string,
    fullNameErrors: { firstNameError: string, lastNameError: string },
    passwordErrors: { passwordError: string, confirmedPasswordError: string }
    emailError: string,
};

export default SignUpViewErrors;