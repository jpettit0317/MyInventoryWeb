import FullName from "../typeDefs/FullName";

interface SignUpControllerProps {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly fullName: FullName;
}

export default SignUpControllerProps;