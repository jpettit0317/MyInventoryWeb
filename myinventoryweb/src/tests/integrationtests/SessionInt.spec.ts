import { Connection, createConnection, Model } from "mongoose";
import IPasswordInfo from "../../interfaces/modelinterfaces/IPasswordInfo";
import ISession from "../../interfaces/modelinterfaces/ISession";
import sessionSchema from "../../models/dbModels/SessionSchema";
import userPasswordSchema from "../../models/dbModels/UserPasswordSchema";
import Session from "../../models/usermodels/Session";
import PasswordService from "../../services/PasswordService";
import SessionService from "../../services/SessionService";
import * as TestHelperVars from "../testutils/helperVars/SessionTestsHelperVars";
import * as TestHelperFuncs from "../testutils/helperFunctions/SesssionTestsHelperFunctions";
import { closeConnection, dropPasswordCollection } from "../testutils/PasswordServiceTestUtils";

describe('Session Integration tests', () => {
    let testSessionConnection: Connection;

    let TestSessions: Model<ISession>;

    let sessionService: SessionService;

    const session = new Session(undefined, "jpettit0317", new Date());

    beforeAll(async (done: jest.DoneCallback) => {
        testSessionConnection = createConnection(TestHelperVars.testDBInfo.sessionConnectionString);

        testSessionConnection.on("error", (error) => {
            done.fail(String(error));
        });

        TestSessions = testSessionConnection.model<ISession>(
            TestHelperVars.testDBInfo.sessionRefName,
            sessionSchema,
            TestHelperVars.testDBInfo.sessionCollection
        );

        sessionService = new SessionService(TestSessions);
        

        await sessionService.createSession(session).then(() => {
            console.log("Saved session " + session.sessionId);
        }).catch(() => {
            console.log("Failed to save session");
        });

        done();
    });

    afterAll(async (done: jest.DoneCallback) => {
        const sessionCollectionName = TestHelperVars.testDBInfo.sessionCollection;

        await dropPasswordCollection(testSessionConnection, sessionCollectionName).then(async (result) => {
            console.log("Succesfully droped session connection " + result);
            await closeConnection(testSessionConnection).then(() => {
                console.log("Session connection closed");
                done();
            }).catch(() => {
                done.fail("Failed to close connection");
            });
        }).catch(async (reasonForRejection: string) => {
            console.log("Failed to drop collection");
            await closeConnection(testSessionConnection).then(() => {
                console.log("Session connection closed");
            }).catch(() => {
                done.fail("Failed to close connection");
            });
            done.fail(reasonForRejection);
        });
    });

    describe('init tests', () => {
        it('test init with ISession', async (done: jest.DoneCallback) => {
            console.log("Looking for session with " + session.sessionId);
            await sessionService.getSession(session.sessionId).then((value) => {
                if (value) {
                    TestHelperFuncs.verifySessionInitWithSession([session, value]);
                    done();
                } else {
                    done.fail("Object is null");
                }
            }).catch((value: Session | null) => {
                if (value) {
                    done.fail(`In catch, Object is ${value}`);
                } else {
                    done.fail(`In catch, Object is null`);
                }
            });
        });
    });
});