import SignUpNetworkCallManager from "../../utils/SignUpNetworkCallManager";

export const testUrls = {
    emptyUrl: "",
    normalUrl: "http://localhost:3000"
};

export function verifyURL(urls: {actualUrl: string, expectedUrl: string}) {
    expect(urls.actualUrl).toBe(urls.expectedUrl);
}

export function createSignUpNetworkManager(url: string = ""): MockSignUpNetworkCallManager {
    return MockSignUpNetworkCallManager.createMockSignUpNetworkCallManager(url);
}

export class MockSignUpNetworkCallManager extends SignUpNetworkCallManager {
    private constructor(newUrl: string = "") {
        super(newUrl);
    }

    static createMockSignUpNetworkCallManager(url: string = "") : MockSignUpNetworkCallManager {
        return new MockSignUpNetworkCallManager(url);
    } 
}