import LoginController from "../../controllers/LoginController";
import UserPasswordInfo from "../../interfaces/modelinterfaces/UserPasswordInfo";
import PasswordService from "../../services/PasswordService";
import SessionService from "../../services/SessionService";

export function createLoginControllerForTest(login: UserPasswordInfo, passwordDB: PasswordService, sessionDB: SessionService) : LoginController {
    return LoginController.createLoginController(login, passwordDB, sessionDB);
}

export function createBlankUsernameAndPasswordController(passwordDB: PasswordService, sessionDB: SessionService): LoginController {
    return LoginController.createLoginController(undefined, passwordDB, sessionDB);
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