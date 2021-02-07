import MyInventoryItem from "../../models/usermodels/MyInventoryItem";
import { MyInventoryItemProps, createMyInventoryItemProps } from "../../props/MyInventoryItemProps";
import AddItemViewModelErrors from "../../typeDefs/AddItemViewModelErrors";
import AddItemViewModel from "../../viewmodels/AddItemViewModel";

export const emptyItemProps = createMyInventoryItemProps();

export const jonDoeProps = createMyInventoryItemProps("Corn", "0001", "jondoe", "Food", {count: 1, units: "ear"});

export const allErrorProps = createMyInventoryItemProps("", "0001", "jondoe", "", 
   {count: -1, units: ""}, "");

export const errorProps = {
    emptyTitleProp : createMyInventoryItemProps(undefined, jonDoeProps.itemId,
        jonDoeProps.owner, jonDoeProps.type, jonDoeProps.count, jonDoeProps.description),
    emptyTypeProp: createMyInventoryItemProps("Chickpeas", jonDoeProps.itemId, jonDoeProps.owner, undefined,
        jonDoeProps.count, jonDoeProps.description),
    negativeCountProp: createMyInventoryItemProps("Chickpeas", jonDoeProps.itemId, jonDoeProps.owner, "Food",
        {count: -1, units: jonDoeProps.count.units}, jonDoeProps.description),
    emptyItemUnitProp: createMyInventoryItemProps("Black beans", jonDoeProps.itemId, 
        jonDoeProps.owner, jonDoeProps.type, {count: jonDoeProps.count.count, units: ""})
}

export const emptyItem: MyInventoryItem = MyInventoryItem.createItem(emptyItemProps);
export const jonDoeItem: MyInventoryItem = MyInventoryItem.createItem(jonDoeProps);
export const allErrorItem: MyInventoryItem = MyInventoryItem.createItem(allErrorProps);

export const emptyErrors: AddItemViewModelErrors = {
    itemTitleError: "",
    itemCountError: "",
    itemUnitError: "",
    itemTypeError: ""
};

export const allErrors: AddItemViewModelErrors = {
    itemTitleError: AddItemViewModel.errors.emptyTitle,
    itemTypeError: AddItemViewModel.errors.emptyType,
    itemCountError: AddItemViewModel.errors.negativeCount,
    itemUnitError: AddItemViewModel.errors.emptyUnit
};