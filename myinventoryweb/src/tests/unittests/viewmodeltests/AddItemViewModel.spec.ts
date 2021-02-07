import { createMyInventoryItemProps } from "../../../props/MyInventoryItemProps";
import AddItemViewModelErrors from "../../../typeDefs/AddItemViewModelErrors";
import AddItemViewModel from "../../../viewmodels/AddItemViewModel";
import * as TestUtilFuncs from "../../testutils/AddItemViewModelTestHelperFunctions";
import * as TestUtilVars from "../../testutils/AddItemViewModelTestHelperVars";


describe('AddItemViewModel tests', () => {
    describe('Init tests', () => {
        it(`when initialized with an empty item, AddItemViewModel's item should be the empty`, () => {
            const sut = TestUtilFuncs.createAddItemViewModel(TestUtilVars.emptyItem);

            TestUtilFuncs.verifyItems([sut.item, TestUtilVars.emptyItem]);
        });

        it(`when intializing with a non-empty item, AddItemViewModel's item should be equal`, () => {
            const sut = TestUtilFuncs.createAddItemViewModel(TestUtilVars.jonDoeItem);

            TestUtilFuncs.verifyItems([sut.item, TestUtilVars.jonDoeItem]);
        });
    });

    describe('Report error tests', () => {
        it('when item has all fields filled in, reportError should return empty', () => {
            const sut = TestUtilFuncs.createAddItemViewModel(TestUtilVars.jonDoeItem);

            const actualErrors = sut.reportError();
            const expectedErrors = TestUtilVars.emptyErrors;

            TestUtilFuncs.verifyAddItemViewModelErrors([actualErrors, expectedErrors]);
        });

        it('when item has an empty title field, reportError should return a title error', () => {
            const emptyTitleItem = TestUtilFuncs.createItem(TestUtilVars.errorProps.emptyTitleProp); 
            const sut = TestUtilFuncs.createAddItemViewModel(emptyTitleItem);
            
            const actualErrors = sut.reportError();

            const expectedErrors: AddItemViewModelErrors = {
                ...TestUtilVars.emptyErrors,
                itemTitleError: AddItemViewModel.errors.emptyTitle
            };

            TestUtilFuncs.verifyAddItemViewModelErrors([actualErrors, expectedErrors]);
        });

        it('when an item has a negative count, reportError should return an itemCount error', () => {
            const negativeCountItem = TestUtilFuncs.createItem(TestUtilVars.errorProps.negativeCountProp);
            const sut = TestUtilFuncs.createAddItemViewModel(negativeCountItem);
            
            const actualErrors = sut.reportError();

            const expectedErrors: AddItemViewModelErrors = {
                ...TestUtilVars.emptyErrors,
                itemCountError: AddItemViewModel.errors.negativeCount
            };

            TestUtilFuncs.verifyAddItemViewModelErrors([actualErrors, expectedErrors]);
        });

        it('when an item has an empty unit, reportError should return an itemUnitError', () => {
            const emptyUnitItem = TestUtilFuncs.createItem(TestUtilVars.errorProps.emptyItemUnitProp);
            const sut = TestUtilFuncs.createAddItemViewModel(emptyUnitItem);

            const actualErrors = sut.reportError();

            const expectedErrors = {
                ...TestUtilVars.emptyErrors,
                itemUnitError: AddItemViewModel.errors.emptyUnit 
            };

            TestUtilFuncs.verifyAddItemViewModelErrors([actualErrors, expectedErrors]);
        });

        it('when an item has an empty type, reportError should return an itemTypeError', () => {
            const emptyTypeItem = TestUtilFuncs.createItem(TestUtilVars.errorProps.emptyTypeProp);
            const sut = TestUtilFuncs.createAddItemViewModel(emptyTypeItem);

            const actualErrors = sut.reportError();

            const expectedErrors = {
                ...TestUtilVars.emptyErrors,
                itemTypeError: AddItemViewModel.errors.emptyType
            };

            TestUtilFuncs.verifyAddItemViewModelErrors([actualErrors, expectedErrors]);
        });

        it('when an item has no fields filled in, reportError should return an error for all required fields', () => {
            const sut = TestUtilFuncs.createAddItemViewModel(TestUtilVars.allErrorItem);

            const actualErrors = sut.reportError();

            TestUtilFuncs.verifyAddItemViewModelErrors([actualErrors, TestUtilVars.allErrors]);
        });
    });
});