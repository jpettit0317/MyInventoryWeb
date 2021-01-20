import { Model, Connection, createConnection } from 'mongoose';
import IPasswordInfo from '../interfaces/modelinterfaces/IPasswordInfo';
import userPasswordSchema from '../models/dbModels/UserPasswordSchema';

export const UserPasswordDBInfo = {
    collectionName: "testPasswordDB",
    modelName: "DBPassword"
};

export function createPasswordModel(connection: Connection): Model<IPasswordInfo> {
    connection.once('open', () => {
        console.log("Connected to " + UserPasswordDBInfo.modelName);
    });

    return connection.model<IPasswordInfo>(
        UserPasswordDBInfo.modelName,
        userPasswordSchema,
        UserPasswordDBInfo.collectionName
    );
}

export function createPasswordConnection(): Connection {
    return createConnection(`mongodb://localhost:27017/${UserPasswordDBInfo.collectionName}`);
}