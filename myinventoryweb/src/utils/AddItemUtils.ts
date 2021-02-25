import { Connection, createConnection, Model } from "mongoose";
import IItem from "../interfaces/modelinterfaces/IItem";
import itemSchema from '../models/dbModels/ItemSchema';

export const ItemCollectionInfo = {
    collectionName: "testItemDB",
    modelName: "DBItem"
};

export function createItemModel(connection: Connection): Model<IItem> {
    connection.once("open", () => {
        console.log("Connected to DBUser");
    });

    return connection.model<IItem>(
        ItemCollectionInfo.modelName,
        itemSchema,
        ItemCollectionInfo.collectionName
    );
}

export function createItemConnection(): Connection {
    return createConnection(`mongodb://localhost:27017/${ItemCollectionInfo.collectionName}`, {useFindAndModify: false});
}