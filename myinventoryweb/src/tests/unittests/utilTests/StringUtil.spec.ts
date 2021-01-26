import { removeDoubleQuotesFromString } from "../../../utils/StringUtil";
import { verifyDoubleQuotesDoNotExist } from "../../testutils/StringUtilTestsUtils";

describe('String Util tests', () => {
    const helloString = "Hello";
    const helloWithQuotes = `"Hello"`;

    describe('RemoveDoubleQuotesFromString tests', () => {
        it(`when given "Hello", should return Hello`, () => {
            const expectedValue = helloString;

            const actualValue = removeDoubleQuotesFromString(helloWithQuotes);

            verifyDoubleQuotesDoNotExist([actualValue, expectedValue]);
        });
        
        it(`when given "", should return ""`, () => {
            const emptyString = "";
            const expectedValue = "";

            const acutalValue = removeDoubleQuotesFromString(emptyString);

            verifyDoubleQuotesDoNotExist([acutalValue, expectedValue]);
        });

        it(`when given Hello, should return Hello`, () => {
            const expectedValue = helloString;

            const actualValue = removeDoubleQuotesFromString(helloString);

            verifyDoubleQuotesDoNotExist([actualValue, expectedValue]);
        });
    });
});