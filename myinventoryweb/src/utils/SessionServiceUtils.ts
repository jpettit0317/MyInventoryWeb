import { Model, Connection, createConnection } from 'mongoose';
import ISession from '../interfaces/modelinterfaces/ISession';
import sessionSchema from '../models/dbModels/SessionSchema';

export const SessionDBInfo = {
    collectionName: "testSessionDB",
    modelName: "DBSession"
};

export function createSessionModel(connection: Connection): Model<ISession> {
    connection.once('open', () => {
        console.log("Connected to " + SessionDBInfo.modelName);
    });

    return connection.model<ISession>(
        SessionDBInfo.modelName,
        sessionSchema,
        SessionDBInfo.collectionName
    );
}

export function createSessionConnection(): Connection {
    return createConnection(`mongodb://localhost:27017/${SessionDBInfo.collectionName}`);
}