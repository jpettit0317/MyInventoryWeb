import MyInventoryItem from "../../../models/usermodels/MyInventoryItem";
import { createMyInventoryItemProps } from "../../../props/MyInventoryItemProps";


export const testItemDBInfo = {
    connectionURI: "mongodb://localhost:27017/userServiceTests",
    testItemCollection: "itemServiceTests",
    refName: "TestItems"
};

export const testProps = {
    jonDoeProps: createMyInventoryItemProps("Corn", "0001", "jondoe", "Food", { count: 1, units: "ear" }),
    emptyItemProps: createMyInventoryItemProps()
};

export const testItems = {
    jonDoeItem: MyInventoryItem.createItem(testProps.jonDoeProps),
    emptyItem: MyInventoryItem.createItem(testProps.emptyItemProps)
};