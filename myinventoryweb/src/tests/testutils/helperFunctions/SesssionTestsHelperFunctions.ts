import ISession from "../../../interfaces/modelinterfaces/ISession";
import Session from "../../../models/usermodels/Session";


export function createDate(dateString: string | undefined): Date {
    if (dateString === undefined) {
        return new Date();
    } else {
        return new Date(dateString);
    }
}

export function createDates(dateStrings: string[]): Date[] {
    return dateStrings.map((value) => {
        if (value === "today") {
            return createDate(undefined);
        } else {
            return createDate(value);
        }
    });
}

export function verifyHasSessionExpired(results: boolean[]) {
    const [actualValue, expectedValue] = results;

    expect(actualValue).toBe(expectedValue);
}

export function verifySessionInit(actualSession: Session, expectedSession: {sessionId: string, user: string, date: Date}) {
    expect(actualSession.sessionId).toBe(expectedSession.sessionId);
    expect(actualSession.user).toBe(expectedSession.user);
    expect(actualSession.expirationDate).toStrictEqual(expectedSession.date);
}

export function verifySessionInitWithSession(sessions: Session[]) {
    const [actualSession, expectedSession] = sessions;
    console.log("In verify");
    const expectedSessionTuple: {sessionId: string, user: string, date: Date} = {
        sessionId: expectedSession.sessionId,
        user: expectedSession.user,
        date: expectedSession.expirationDate 
    };

    verifySessionInit(actualSession, expectedSessionTuple);
}

export function createSession(info: {sessionId: string, user: string, date: Date}): Session {
    return new Session(info.sessionId, info.user, info.date);
}

export function createSessions(info: { sessionId: string, user: string, date: Date }[]): Session[] {
    return info.map((value) => {
        return createSession(value);
    });
}
