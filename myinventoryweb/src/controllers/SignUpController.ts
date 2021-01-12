import SignUpControllerProps from "../props/SignUpControllerProps";
import FullName from "../typeDefs/FullName";

class SignUpController {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly fullName: FullName;

    private constructor(props: SignUpControllerProps) {
        this.username = props.username;
        this.email = props.email;
        this.password = props.password;
        this.fullName = props.fullName;
    }

    static createSignUpController(props: SignUpControllerProps): SignUpController {
        return new SignUpController(props);
    }
}

export default SignUpController;