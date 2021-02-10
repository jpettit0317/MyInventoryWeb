import { Done } from "@material-ui/icons";
import { rejects } from "assert";
import { Connection, Model } from "mongoose";
import IItem from "../../../interfaces/modelinterfaces/IItem";
import MyInventoryItem from "../../../models/usermodels/MyInventoryItem";

export function verifyItemServiceMessage(messages: string[]) {
    const [actualMessage, expectedMessage] = messages;

    expect(actualMessage).toBe(expectedMessage);
}

export function verifyItemCount(counts: number[]) {
    const [actualCount, expectedCount] = counts;
    
    expect(actualCount).toBe(expectedCount);
}

export async function findItemCount(model: Model<IItem>, item: MyInventoryItem): Promise<number> {
    return new Promise (async (resolve) => {
        await model.find({
            itemId: item.itemId,
            title: item.title,
            owner: item.owner,
            type: item.type,
            count: item.count.count,
            countUnit: item.count.units
        }).then((result) => {
            if (result.length == 0) {
                resolve(0);
            } else {
                resolve(result.length);
            }
        }).catch(() => {
            resolve(-1);
        });
    });
}

export async function cleanUpDB(info: {connection: Connection, collection: string, done: jest.DoneCallback}) {
    await dropCollection(info.connection, info.collection).then(async (result) => {
        console.log("Collection drop result: " + result);
        await closeConnection(info.connection).then((closeConnectionResult) => {
            console.log("Connection closed result:  " + closeConnectionResult);
            info.done();
        }).catch((reasonForRejection: string) => {
            console.log("Failed to close connection: " + reasonForRejection);
            info.done.fail(reasonForRejection);
        });
    }).catch(async (dropCollectionFailReason: string) => {
        await closeConnection(info.connection).then((closeConnectionResult) => {
            console.log("Connection closed " + closeConnectionResult);
            info.done();
        }).catch((reasonForRejection: string) => {
            console.log("Failed to close connection " + reasonForRejection);
            info.done.fail(reasonForRejection);
        });
    });
}

async function dropCollection(connection: Connection, collectionName: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        await connection.db.dropCollection(collectionName).then( () => {
            resolve("Successfully dropped");
        }).catch( (reasonForRejection: string) => {
            reject(reasonForRejection);
        });
    });
}

async function closeConnection(connection: Connection): Promise<string> {
    return new Promise( async (resolve, reject) => {
        await connection.close().then( () => {
            resolve("Connection closed.");
        }).catch((rejectionReason) => {
            reject(rejectionReason);
        });
    });
}