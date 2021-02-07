import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import AddItemViewModelErrors from "../typeDefs/AddItemViewModelErrors";

class AddItemViewModel {
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

    static createAddItemViewModelWithItem(newItem: MyInventoryItem): AddItemViewModel {
        return new AddItemViewModel(newItem);
    }

    reportError(): AddItemViewModelErrors {
        const errors = this.getErrors();

        return errors;
    }

    private getErrors(): AddItemViewModelErrors {
        let errors: AddItemViewModelErrors = {
            itemTitleError: "",
            itemCountError: "",
            itemUnitError: "",
            itemTypeError: ""
        };

        if (this.item.title === "") {
            errors.itemTitleError = AddItemViewModel.errors.emptyTitle;
        }

        if (this.item.count.count < 0) {
            errors.itemCountError = AddItemViewModel.errors.negativeCount;
        }

        if (this.item.count.units === "") {
            errors.itemUnitError = AddItemViewModel.errors.emptyUnit;
        }

        if (this.item.type === "") {
            errors.itemTypeError = AddItemViewModel.errors.emptyType;
        }

        return errors;
    }

}

export default AddItemViewModel;