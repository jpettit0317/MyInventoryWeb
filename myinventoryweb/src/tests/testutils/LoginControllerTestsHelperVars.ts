import UserPasswordInfo from "../../interfaces/modelinterfaces/UserPasswordInfo";

export const jonLoginInfo: UserPasswordInfo = {
    username: "jondoe",
    password: "jondoepassword"
};

export const invalidJonLoginInfo: UserPasswordInfo = {
    username: jonLoginInfo.username,
    password: "jondoewrongpassword"
};

export const janeLoginInfo: UserPasswordInfo = {
    username: "janedoe",
    password: "janedoepassword"
};

export const blankLoginInfo: UserPasswordInfo = {
    username: "",
    password: ""
};

export const invalidPassword: string = "Passwords don't match";
export const userDoesntExist: string = "User doesn't exist";

export const integrationLoginControllerTestInfo = {
    connectionString: "mongodb://localhost:27017/loginControllerTests",
    collectionName: "loginControllerTests",
    refName: "TestLoginPasswords",
    sessionConnectionString: "mongodb://localhost:27017/loginControllerTests",
    sessionCollection: "loginControllerSessions",
    sessionRefName: "TestLoginControllerSessions"
};