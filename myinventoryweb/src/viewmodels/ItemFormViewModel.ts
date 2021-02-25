import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import ItemFormViewModelErrors from "../typeDefs/ItemFormViewModelErrors";

class ItemFormViewModel {
    readonly item: MyInventoryItem;

    static readonly errors = {
        emptyTitle: "Item must have a title",
        negativeCount: "Item count must be non-negative",
        emptyUnit: "Item must have a unit",
        emptyType: "Item must have a type"
    };

    private constructor(newItem: MyInventoryItem) {
        this.item = newItem;
    }

    static createItemViewModelWithItem(newItem: MyInventoryItem): ItemFormViewModel {
        return new ItemFormViewModel(newItem);
    }

    reportError(): ItemFormViewModelErrors {
        const errors = this.getErrors();

        return errors;
    }

    private getErrors(): ItemFormViewModelErrors {
        let errors: ItemFormViewModelErrors = {
            itemTitleError: "",
            itemCountError: "",
            itemUnitError: "",
            itemTypeError: ""
        };

        if (this.item.title === "") {
            errors.itemTitleError = ItemFormViewModel.errors.emptyTitle;
        }

        if (this.item.count.count < 0) {
            errors.itemCountError = ItemFormViewModel.errors.negativeCount;
        }

        if (this.item.count.units === "") {
            errors.itemUnitError = ItemFormViewModel.errors.emptyUnit;
        }

        if (this.item.type === "") {
            errors.itemTypeError = ItemFormViewModel.errors.emptyType;
        }

        return errors;
    }

    

}

export default ItemFormViewModel;