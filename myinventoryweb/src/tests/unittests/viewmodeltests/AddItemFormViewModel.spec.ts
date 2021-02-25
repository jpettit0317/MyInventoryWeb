import { createMyInventoryItemProps } from "../../../props/MyInventoryItemProps";
import ItemViewModelErrors from "../../../typeDefs/ItemFormViewModelErrors";
import ItemFormViewModel from "../../../viewmodels/ItemFormViewModel";
import * as TestUtilFuncs from "../../testutils/ItemFormViewModelTestHelperFunctions";
import * as TestUtilVars from "../../testutils/ItemFormViewModelTestHelperVars";


describe('AddItemViewModel tests', () => {
    describe('Init tests', () => {
        it(`when initialized with an empty item, AddItemViewModel's item should be the empty`, () => {
            const sut = TestUtilFuncs.createItemViewModel(TestUtilVars.emptyItem);

            TestUtilFuncs.verifyItems([sut.item, TestUtilVars.emptyItem]);
        });

        it(`when intializing with a non-empty item, AddItemViewModel's item should be equal`, () => {
            const sut = TestUtilFuncs.createItemViewModel(TestUtilVars.jonDoeItem);

            TestUtilFuncs.verifyItems([sut.item, TestUtilVars.jonDoeItem]);
        });
    });

    describe('Report error tests', () => {
        it('when item has all fields filled in, reportError should return empty', () => {
            const sut = TestUtilFuncs.createItemViewModel(TestUtilVars.jonDoeItem);

            const actualErrors = sut.reportError();
            const expectedErrors = TestUtilVars.emptyErrors;

            TestUtilFuncs.verifyItemFormViewModel([actualErrors, expectedErrors]);
        });

        it('when item has an empty title field, reportError should return a title error', () => {
            const emptyTitleItem = TestUtilFuncs.createItem(TestUtilVars.errorProps.emptyTitleProp); 
            const sut = TestUtilFuncs.createItemViewModel(emptyTitleItem);
            
            const actualErrors = sut.reportError();

            const expectedErrors: ItemViewModelErrors = {
                ...TestUtilVars.emptyErrors,
                itemTitleError: ItemFormViewModel.errors.emptyTitle
            };

            TestUtilFuncs.verifyItemFormViewModel([actualErrors, expectedErrors]);
        });

        it('when an item has a negative count, reportError should return an itemCount error', () => {
            const negativeCountItem = TestUtilFuncs.createItem(TestUtilVars.errorProps.negativeCountProp);
            const sut = TestUtilFuncs.createItemViewModel(negativeCountItem);
            
            const actualErrors = sut.reportError();

            const expectedErrors: ItemViewModelErrors = {
                ...TestUtilVars.emptyErrors,
                itemCountError: ItemFormViewModel.errors.negativeCount
            };

            TestUtilFuncs.verifyItemFormViewModel([actualErrors, expectedErrors]);
        });

        it('when an item has an empty unit, reportError should return an itemUnitError', () => {
            const emptyUnitItem = TestUtilFuncs.createItem(TestUtilVars.errorProps.emptyItemUnitProp);
            const sut = TestUtilFuncs.createItemViewModel(emptyUnitItem);

            const actualErrors = sut.reportError();

            const expectedErrors = {
                ...TestUtilVars.emptyErrors,
                itemUnitError: ItemFormViewModel.errors.emptyUnit 
            };

            TestUtilFuncs.verifyItemFormViewModel([actualErrors, expectedErrors]);
        });

        it('when an item has an empty type, reportError should return an itemTypeError', () => {
            const emptyTypeItem = TestUtilFuncs.createItem(TestUtilVars.errorProps.emptyTypeProp);
            const sut = TestUtilFuncs.createItemViewModel(emptyTypeItem);

            const actualErrors = sut.reportError();

            const expectedErrors = {
                ...TestUtilVars.emptyErrors,
                itemTypeError: ItemFormViewModel.errors.emptyType
            };

            TestUtilFuncs.verifyItemFormViewModel([actualErrors, expectedErrors]);
        });

        it('when an item has no fields filled in, reportError should return an error for all required fields', () => {
            const sut = TestUtilFuncs.createItemViewModel(TestUtilVars.allErrorItem);

            const actualErrors = sut.reportError();

            TestUtilFuncs.verifyItemFormViewModel([actualErrors, TestUtilVars.allErrors]);
        });
    });
});