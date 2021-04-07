import { Environment, CollectionName, getCollectionName } from "../../../utils/CollectionNameUtil";

export const testVars = {
    prodItem: { environment: Environment.prod, collectionName: CollectionName.item },
    testItem: { environment: Environment.dev, collectionName: CollectionName.item },
    prodSession: { environment: Environment.prod, collectionName: CollectionName.session },
    testSession: { environment: Environment.dev, collectionName: CollectionName.session },
    prodUser: { environment: Environment.prod, collectionName: CollectionName.user },
    testUser: { environment: Environment.dev, collectionName: CollectionName.user },
    prodPassword: { environment: Environment.prod, collectionName: CollectionName.password },
    testPassword: { environment: Environment.dev, collectionName: CollectionName.password }
}

export const acutalCollectionNames = {
    testItemDB: "testItemDB",
    prodItemDB: "itemDB",
    testSession: "testSessionDB",
    prodSession: "sessionDB",
    testUser: "testUserDB",
    prodUser: "userDB",
    testPassword: "testPasswordDB",
    prodPassword: "passwordDB"
};