import { ButtonGroup, Button } from "@material-ui/core/";
import React, { MouseEvent } from "react";
import { v4 as uuidv4 } from 'uuid';

export interface ButtonGroupProps {
    totalPages: number;
    currentPage: number;
    buttonPressed: (index: number) => void;
    displayRangePressed: () => void;
} 

export function ItemPageButtonGroup(props: ButtonGroupProps) {
    const visibleNumbers = getButtons();
    const currentPage = props.currentPage;

    function indexButtonPressed(event: MouseEvent<HTMLElement>) {
        console.log("The id of button pressed was " + event.currentTarget.id);
        const buttonNumber = getButtonNameFromId(event.currentTarget.id);

        if (buttonNumber === -1) {
            props.displayRangePressed();
        } else {
            props.buttonPressed(buttonNumber);
        }
    }

    function getButtonNameFromId(id: string): number {
        const idAsIndex = Number(id);
        const buttonName = visibleNumbers[idAsIndex].buttonName;

        if (buttonName === "...") {
            return -1;
        } else {
            return Number(buttonName);
        }
    }

    function renderButtonGroup(): JSX.Element | undefined {
        if (props.totalPages < 0 || props.currentPage > props.totalPages) {
            return undefined;
        }
        
        return (
            <div>
                {renderButtons()}
            </div>
        );
    }

    function renderButtons(): JSX.Element {
        return (
            <div>
                {props.totalPages > 10 ? renderBigButtonGroup() : renderNormalButtonGroup()}
            </div>
        )
    }

    function getNumberArray(numberOfButtons: number): number[] {
        return [...Array(numberOfButtons).keys()];
    }

    function renderNormalButtonGroup(): JSX.Element {
        return (
            <div>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    {
                        visibleNumbers.map((value, index) => (
                            <div>
                                {renderButton(value)}
                            </div>
                        ))
                    }
                </ButtonGroup>
            </div>
        );
    }

    function renderBigButtonGroup(): JSX.Element {
        return (
            <div>
                <ButtonGroup color="primary" aria-label="outlined primary button group" key={uuidv4()}>
                    {
                        visibleNumbers.map((value) => (
                            renderButton(value)
                        ))
                    }
                </ButtonGroup>
            </div>
        );
    }

    function renderButton(info: {buttonName: string, id: string}): JSX.Element {
        const indexAsString = String(props.currentPage);
        console.log(`Id: ${info.id}, Name: ${info.buttonName}`);
        return (
            <div key={uuidv4()}>
                { indexAsString === info.buttonName ? renderDisabledButton(info) : renderNormalButton(info)}
            </div>
        );
    }

    function renderNormalButton(info: {buttonName: string, id: string}): JSX.Element {
        return <Button key={uuidv4()} id={info.id} onClick={indexButtonPressed}>{info.buttonName}</Button>
    }

    function renderDisabledButton(info: {buttonName: string, id: string}): JSX.Element {
        return <Button key={uuidv4()} id={info.id} onClick={indexButtonPressed} style={{backgroundColor: 'gray'}}>{info.buttonName}</Button>
    }

    function getButtonRange(range: {min: number, max: number}): string[] {
        let numbers: string[] = [];

        for (let i = range.min; i <= range.max; i++) {
            const numberAsString = `${i}`;
            numbers.push(numberAsString);
        }

        return numbers;
    }

    function getButtons(): {buttonName: string, id: string}[] {
        if (props.totalPages < 11) {
            console.log("Total pages are less then 10")
            return getButtonNamesForRange({min: 1, max: props.totalPages});
        } else if (props.currentPage <= 4) {
            return getButtonNamesCloseToStart();
        } else if (props.currentPage >= props.totalPages - 4) {
            return getButtonNamesCloseToEnd();
        } else {
            return getButtonNames();
        }
    }

    function getButtonNamesCloseToStart(): {buttonName: string, id: string}[] {
        const beginningbuttonNames = getButtonRange({min: 1, max: 5});
        const threeDots = "...";
        const lastPage = `${props.totalPages}`;
        const buttonNames = [...beginningbuttonNames, threeDots, lastPage];
        const buttonNameWithId: {buttonName: string, id: string}[] = [];

        buttonNames.forEach((name, index) => {
            buttonNameWithId.push({buttonName: name, id: `${index}`});
        });

        return buttonNameWithId;
    }

    function getButtonNamesCloseToEnd(): {buttonName: string, id: string}[] {
        const endbuttonNames = getButtonRange({ min: props.totalPages - 5, max: props.totalPages});
        const threeDots = "...";
        const firstPage = "1";
        const buttonNames = [firstPage, threeDots, ...endbuttonNames];
        const buttonNameWithId: { buttonName: string, id: string }[] = [];

        buttonNames.forEach((name, index) => {
            buttonNameWithId.push({ buttonName: name, id: `${index}` });
        });

        return buttonNameWithId;
    }

    function getButtonNames(): {buttonName: string, id: string}[] {
        const middlebuttonNames = getButtonRange({ min: props.currentPage - 2, max: props.currentPage + 2 });
        console.log("Middle button names " + middlebuttonNames);
        const threeDots = "...";
        const firstPage = "1";
        const lastPage = `${props.totalPages}`;
        const buttonNames = [firstPage, threeDots, ...middlebuttonNames, threeDots, lastPage];
        const buttonNameWithId: { buttonName: string, id: string }[] = [];

        buttonNames.forEach((name, index) => {
            buttonNameWithId.push({ buttonName: name, id: `${index}` });
        });

        return buttonNameWithId;
    }

    function getButtonNamesForRange(range: {min: number, max: number}): { buttonName: string, id: string }[] {
        const middlebuttonNames = getButtonRange({ min: range.min, max: range.max});
        const buttonNameWithId: { buttonName: string, id: string }[] = [];
        console.log("Buttons are " + middlebuttonNames);

        middlebuttonNames.forEach((name, index) => {
            buttonNameWithId.push({ buttonName: name, id: `${index}` });
        });

        return buttonNameWithId;
    }


    return (
        <div>
            {renderButtonGroup()}
        </div>
    )
}