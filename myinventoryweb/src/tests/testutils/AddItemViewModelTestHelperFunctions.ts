import MyInventoryItem from "../../models/usermodels/MyInventoryItem";
import { MyInventoryItemProps } from "../../props/MyInventoryItemProps";
import AddItemViewModelErrors from "../../typeDefs/AddItemViewModelErrors";
import ItemCount from "../../typeDefs/ItemCount";
import AddItemViewModel from "../../viewmodels/AddItemViewModel";

export function verifyItems(items: MyInventoryItem[]) {
    const [actualItem, expectedItem] = items;

    expect(actualItem.title).toBe(expectedItem.title);
    expect(actualItem.owner).toBe(expectedItem.owner);
    expect(actualItem.itemId).toBe(expectedItem.itemId);
    expect(actualItem.type).toBe(expectedItem.type);
    verifyItemCount([actualItem.count, expectedItem.count]);
}

function verifyItemCount(itemCounts: ItemCount[]) {
    const [actualItemCount, expectedItemCount] = itemCounts;

    expect(actualItemCount.count).toBe(expectedItemCount.count);
    expect(actualItemCount.units).toBe(expectedItemCount.units);
}

export function verifyAddItemViewModelErrors(errors: AddItemViewModelErrors[]) {
    const [actualErrors, expectedErrors] = errors;

    expect(actualErrors.itemTitleError).toBe(expectedErrors.itemTitleError);
    expect(actualErrors.itemTypeError).toBe(expectedErrors.itemTypeError);
    expect(actualErrors.itemCountError).toBe(expectedErrors.itemCountError);
    expect(actualErrors.itemUnitError).toBe(expectedErrors.itemUnitError);
}

export function createAddItemViewModel(item: MyInventoryItem): AddItemViewModel {
    return AddItemViewModel.createAddItemViewModelWithItem(item);
}

export function createItem(props: MyInventoryItemProps): MyInventoryItem {
    return MyInventoryItem.createItem(props);
}