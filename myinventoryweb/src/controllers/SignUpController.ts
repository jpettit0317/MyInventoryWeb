import UserSignUpInfo from "../interfaces/modelinterfaces/UserSignUpInfo";
import SignUpControllerProps from "../props/SignUpControllerProps";

class SignUpController {
    private userSignUpInfo: UserSignUpInfo;

    private constructor(props: SignUpControllerProps) {
        this.userSignUpInfo = {
            email: props.email,
            username: props.username,
            password: props.password,
            firstName: props.fullName.firstName,
            lastName: props.fullName.lastName,
            userId: ""
        };
    }

    static createSignUpController(props: SignUpControllerProps): SignUpController {
        return new SignUpController(props);
    }
}

export default SignUpController;