interface UserPasswordDBInfo {
    readonly username: string;
    readonly password: string;
    readonly salt: string;
}

export default UserPasswordDBInfo;