import MyInventoryItem from "../../models/usermodels/MyInventoryItem";
import { MyInventoryItemProps } from "../../props/MyInventoryItemProps";
import ItemViewModelErrors from "../../typeDefs/ItemFormViewModelErrors";
import ItemCount from "../../typeDefs/ItemCount";
import ItemFormViewModel from "../../viewmodels/ItemFormViewModel";

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

export function verifyItemFormViewModel(errors: ItemViewModelErrors[]) {
    const [actualErrors, expectedErrors] = errors;

    expect(actualErrors.itemTitleError).toBe(expectedErrors.itemTitleError);
    expect(actualErrors.itemTypeError).toBe(expectedErrors.itemTypeError);
    expect(actualErrors.itemCountError).toBe(expectedErrors.itemCountError);
    expect(actualErrors.itemUnitError).toBe(expectedErrors.itemUnitError);
}

export function createItemViewModel(item: MyInventoryItem): ItemFormViewModel {
    return ItemFormViewModel.createItemViewModelWithItem(item);
}

export function createItem(props: MyInventoryItemProps): MyInventoryItem {
    return MyInventoryItem.createItem(props);
}