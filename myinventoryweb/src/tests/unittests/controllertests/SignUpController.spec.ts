import SignUpController from "../../../controllers/SignUpController";
import * as TestUtils from "../../testutils/SignUpControllerTestUtils";

describe('SignUpController tests', () => {
    describe('Constructor tests', () => {
        it('When initalized with empty props, properties should return empty', () => {
            const sut = TestUtils.buildEmptySignUpController();

            TestUtils.verifyControllerFields(sut, TestUtils.emptyProps);
        });

        it('When intialized with all fields filled in, properties should return expected values', () => {
            const sut = TestUtils.buildSignUpController(TestUtils.allFilledInProps);

            TestUtils.verifyControllerFields(sut, TestUtils.allFilledInProps);
        });
    });
});