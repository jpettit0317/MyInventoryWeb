import Passwords from './Passwords';
import FullName from './FullName';

type SignUpViewModelProps = {
    username: string,
    passwords: Passwords,
    email: string,
    fullName: FullName
};

export default SignUpViewModelProps;