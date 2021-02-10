import { Connection, Model, createConnection } from "mongoose";
import IItem from "../../interfaces/modelinterfaces/IItem";
import ItemService from "../../services/ItemService";
import {
    closeConnection,
    dropPasswordCollection,
} from "../testutils/PasswordServiceTestUtils";
import { testItemDBInfo, testItems } from "../testutils/helperVars/ItemServiceTestHelperVars";
import { cleanUpDB, verifyItemServiceMessage, verifyItemCount, findItemCount } from "../testutils/helperFunctions/ItemServiceTestHelperFunctions";
import itemSchema from "../../models/dbModels/ItemSchema";

describe('Item Service integration tests', () => {
    let testItemConnection: Connection;
    let TestItems: Model<IItem>;
    let sut: ItemService;

    beforeAll( async (done: jest.DoneCallback) => {
        testItemConnection = createConnection(testItemDBInfo.connectionURI);

        testItemConnection.on("error", (error) => {
            done.fail(String(error));
        });

        TestItems = testItemConnection.model<IItem>(testItemDBInfo.refName, itemSchema, testItemDBInfo.testItemCollection);

        sut = new ItemService(TestItems);

        done();
    });

    afterAll( async (done: jest.DoneCallback) => {
       await cleanUpDB({connection: testItemConnection, 
        collection: testItemDBInfo.testItemCollection, 
        done: done});
    });

    describe('ItemService addItem tests', () => {
        it('when adding an item is valid, ItemService should return empty', async (done: jest.DoneCallback) => {
            await sut.addItem(testItems.jonDoeItem).then(async (result) => {
                const expectedMessage = "";
                verifyItemServiceMessage([result, expectedMessage]);
                await findItemCount(TestItems, testItems.jonDoeItem).then((count) => {
                    verifyItemCount([count, 1]);
                    done();
                });
            }).catch( (reasonForRejection) => {
                done.fail(reasonForRejection);
            });
        });

        it('when adding an invalid item, addItem should return an error message', async (done: jest.DoneCallback) => {
            await sut.addItem(testItems.emptyItem).then(async (result) => {
                const expectedMessage = sut.emptyItemErrorMessage;
                verifyItemServiceMessage([result, expectedMessage]);
                await findItemCount(TestItems, testItems.emptyItem).then((count) => {
                    verifyItemCount([count, 0]);
                    done();
                });
            }).catch((reasonForRejection: string) => {
                done.fail(reasonForRejection);
            });
        });
    });
});