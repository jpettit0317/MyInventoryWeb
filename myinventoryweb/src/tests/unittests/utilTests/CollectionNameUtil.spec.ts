require('dotenv').config();
import { CollectionName, Environment, getCollectionName } from "../../../utils/CollectionNameUtil";
import { testVars, acutalCollectionNames } from "../../testutils/helperVars/CollectionNameUtilHelperVars";
import { callGetCollectionName, verifyCollectionName } from "../../testutils/helperFunctions/CollectionNameUtilHelperFunctions";

describe("CollectionNameUtil tests", () => {
    it('when prod and user is passed in, getCollectionName should return userDB', () => {
        const collectionNames = callGetCollectionName(testVars.prodUser, acutalCollectionNames.prodUser);

        verifyCollectionName(collectionNames);
    });

    it('when dev and user is passed in, getCollectionName should return testUserDB', () => {
        const collectionNames = callGetCollectionName(testVars.testUser, acutalCollectionNames.testUser);

        verifyCollectionName(collectionNames);
    });

    it('when dev and session is passed in, getCollectionName should return testSessionDB', () => {
        const collectionNames = callGetCollectionName(testVars.testSession, acutalCollectionNames.testSession);

        verifyCollectionName(collectionNames);
    });

    it('when prod and session is passed in, getCollectionName should return testSessionDB', () => {
        const collectionNames = callGetCollectionName(testVars.prodSession, acutalCollectionNames.prodSession);

        verifyCollectionName(collectionNames);
    });

    it('when prod and password is passed in, getCollectionName should return passwordDB', () => {
        const collectionNames = callGetCollectionName(testVars.prodPassword, acutalCollectionNames.prodPassword);

        verifyCollectionName(collectionNames);
    });

    it('when dev and password is passed in, getCollectionName should return testSessionDB', () => {
        const collectionNames = callGetCollectionName(testVars.testPassword, acutalCollectionNames.testPassword);

        verifyCollectionName(collectionNames);
    });

    it('when prod and item is passed in, getCollectionName should return itemDB', () => {
        const collectionNames = callGetCollectionName(testVars.prodItem, acutalCollectionNames.prodItemDB);

        verifyCollectionName(collectionNames);
    });

    it('when dev and item is passed in, getCollectionName should return testItemDB', () => {
        const collectionNames = callGetCollectionName(testVars.testItem, acutalCollectionNames.testItemDB);

        verifyCollectionName(collectionNames);
    });
});

export {};

