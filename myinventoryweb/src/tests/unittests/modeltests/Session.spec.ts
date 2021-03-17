import { createDate, createDates, verifyHasSessionExpired, createSession, verifySessionInit } from "../../testutils/helperFunctions/SesssionTestsHelperFunctions";
import { dates, users } from "../../testutils/helperVars/SessionTestsHelperVars";
import { v4 as uuidv4 } from 'uuid';

describe("Session tests", () => {
    const userId = uuidv4();
    const jondoe = users.jondoe;
    const expirationDate = createDate(dates.jan12021);

    describe('init tests', () => {
        it('when intialized with all values passed in, field members should be equal', () => {
            const sessionInfo: { sessionId: string, user: string, date: Date } = {sessionId: userId, user: jondoe, date: expirationDate};
            const session = createSession(sessionInfo);

            verifySessionInit(session, sessionInfo);
        });
    });

    describe('hasExpired tests', () => {
        it('when access date is passed the expiration date, hasExpired should return true', () => {
            const today = new Date();
            const expirationDate = createDate(dates.dec171995);
            const session = createSession({sessionId: uuidv4(), user: users.jondoe, date: expirationDate});
            
            const expectedResult = true;
            const actualResult = session.hasExpired(today);

            verifyHasSessionExpired([actualResult, expectedResult]);
        });

        it('when access date is before the expiration date, hasExpired should return false', () => {
            const [expirationDate, todaysDate] = createDates(["today", dates.dec171995]);

            const session = createSession({sessionId: uuidv4(), user: users.jondoe, date: expirationDate});
            const actualValue = session.hasExpired(todaysDate);
            const expectedValue = false;

            verifyHasSessionExpired([actualValue, expectedValue]);
        });
    });
});