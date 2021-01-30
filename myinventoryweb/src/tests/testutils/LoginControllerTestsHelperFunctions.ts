import LoginController from "../../controllers/LoginController";
import UserPasswordInfo from "../../interfaces/modelinterfaces/UserPasswordInfo";
import PasswordService from "../../services/PasswordService";

export function createLoginControllerForTest(login: UserPasswordInfo, passwordDB: PasswordService) : LoginController {
    return LoginController.createLoginController(login, passwordDB);
}

export function createBlankUsernameAndPasswordController(passwordDB: PasswordService): LoginController {
    return LoginController.createLoginController(undefined, passwordDB);
}

export function convertToUserPasswordInfo(username: string = "", password: string = ""): UserPasswordInfo {
    const newInfo: UserPasswordInfo = {
        username: username,
        password: password
    };

    return newInfo;
}

export function verifyUserPasswordInfoAreEqual(info: UserPasswordInfo[]) {
    const [actualInfo, expectedInfo] = info;

    expect(actualInfo.username).toBe(expectedInfo.username);
    expect(actualInfo.password).toBe(expectedInfo.password);
}