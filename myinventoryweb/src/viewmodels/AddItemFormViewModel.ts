import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import AddItemFormViewModelErrors from "../typeDefs/AddItemFormViewModelErrors";
import AddItemNetworkCallManager from "../utils/AddItemNetworkCallManager";

class AddItemFormViewModel {
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

    static createAddItemViewModelWithItem(newItem: MyInventoryItem): AddItemFormViewModel {
        return new AddItemFormViewModel(newItem);
    }

    reportError(): AddItemFormViewModelErrors {
        const errors = this.getErrors();

        return errors;
    }

    private getErrors(): AddItemFormViewModelErrors {
        let errors: AddItemFormViewModelErrors = {
            itemTitleError: "",
            itemCountError: "",
            itemUnitError: "",
            itemTypeError: ""
        };

        if (this.item.title === "") {
            errors.itemTitleError = AddItemFormViewModel.errors.emptyTitle;
        }

        if (this.item.count.count < 0) {
            errors.itemCountError = AddItemFormViewModel.errors.negativeCount;
        }

        if (this.item.count.units === "") {
            errors.itemUnitError = AddItemFormViewModel.errors.emptyUnit;
        }

        if (this.item.type === "") {
            errors.itemTypeError = AddItemFormViewModel.errors.emptyType;
        }

        return errors;
    }

    

}

export default AddItemFormViewModel;