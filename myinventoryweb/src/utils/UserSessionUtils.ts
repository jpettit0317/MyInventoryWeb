import SessionService from "../services/SessionService";
import { Connection, Model } from "mongoose";
import { createSessionModel } from "./SessionServiceUtils";
import { MyInventoryItemProps } from "../props/MyInventoryItemProps";

function createSessionService(connection: Connection): SessionService {
    const sessionModel = createSessionModel(connection);

    return new SessionService(sessionModel);
}

export async function createNewItemProps(props: MyInventoryItemProps, connection: Connection): Promise<{result: boolean, props: MyInventoryItemProps}> {
    const sessionService = createSessionService(connection);

    return new Promise(async (resolve, reject) => {
        await sessionService.getUserWithId(props.owner).then((result) => {
            const itemProps = createProps(props, result.user);
            resolve({result: true, props: itemProps});
        }).catch((reasonForRejection: string) => {
            console.log("In getting user with id: " + reasonForRejection);
            reject({result: false, props: props});
        });
    });
}

export async function getUsername(sessionId: string, connection: Connection): Promise<{result: boolean, user: string}> {
    const sessionService = createSessionService(connection);

    return new Promise(async (resolve, reject) => {
        await sessionService.getUserWithId(sessionId).then((result) => {
            resolve({result: result.result, user: result.user});
        }).catch(() => {
            reject({result: false, user: ""});
        });
    });
}

function createProps(oldItemProps: MyInventoryItemProps, username: string): MyInventoryItemProps {
    let newItemProps: MyInventoryItemProps = {
        ...oldItemProps,
        owner: username
    }

    return newItemProps;
}