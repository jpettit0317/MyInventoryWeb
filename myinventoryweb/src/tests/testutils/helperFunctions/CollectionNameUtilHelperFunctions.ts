require("dotenv").config();

import { Environment, CollectionName, getCollectionName } from "../../../utils/CollectionNameUtil";

export function verifyCollectionName(collectionNames: string[]) {
    const [actualName, expectedName] = collectionNames;

    expect(actualName).toBe(expectedName);
}

export function callGetCollectionName(info: { environment: Environment, collectionName: CollectionName }, expectedName: string): string[] {
    const actualCollectionName = getCollectionName(info.environment, info.collectionName);

    return [actualCollectionName, expectedName];
}