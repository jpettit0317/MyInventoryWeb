import SignUpNetworkCallManager from "../../../utils/SignUpNetworkCallManager";
import * as TestUtils from "../../testutils/SignUpNetworkCallManagerTestUtils";

describe('SignUpNetworkCallManager tests', () => {
    describe('url tests', () => {
        it('when initalized, urls should match', () => {
            const sut = TestUtils.createSignUpNetworkManager(TestUtils.testUrls.normalUrl);

            const urls = {
                actualUrl: sut.urlString,
                expectedUrl: TestUtils.testUrls.normalUrl
            };

            TestUtils.verifyURL(urls);
        });
    });
});