import { Bool, NumericType, isNumberValid, isNumericType } from "common";

//FIXME: does not support "true" or "false"
const ARRAY_EXP = /^\[(?:\d+(?:,(?=\d))?)*\]$/;

export function checkArrayExp(
    arrExp: string,
    itemType: NumericType | Bool
): boolean {
    if (!ARRAY_EXP.test(arrExp)) {
        return false;
    }

    if (arrExp.length == 2) {
        return true;
    }

    const arrMembers = arrExp.slice(1, -1).replaceAll(" ", "").split(",");

    if (isNumericType(itemType)) {
        for (const item of arrMembers) {
            if (!isNumberValid(item, itemType)) {
                return false;
            }
        }
    } else {
        for (const item of arrMembers) {
            if (!isBoolExpValid(item)) {
                return false;
            }
        }
    }

    return true;
}

function isBoolExpValid(boolExp: string): boolean {
    return boolExp == "true" || boolExp == "false";
}

export function getArrayItems(
    arrExp: string,
    itemType: NumericType | Bool
): any[] | undefined {
    if (!checkArrayExp(arrExp, itemType)) {
        return undefined;
    }

    if (arrExp.length == 2) {
        return [];
    }

    const arrMembers = arrExp.slice(1, -1).replaceAll(" ", "").split(",");

    if (isNumericType(itemType)) {
        return arrMembers.map((item) => parseFloat(item));
    } else {
        return arrMembers.map((item) => item == "true");
    }
}
