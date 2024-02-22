// Adapted from http://ccdb.hemiola.com/js/CcdbUtil.js

const setCharAt = (str: string, i: number, ch: string) => {
    if (i < str.length) {
        return str.substring(0, i) + ch + str.substring(i + 1);
    }

    return str;
};
const splitSound = function (value: string): [string, number] {
    let lowerCaseValue: string = ""
    let result: string = "";
    if (value) {
        lowerCaseValue = value.toLowerCase();
    }

    let tone: number = parseInt(value.substring(value.length - 1), 10);
    if (isNaN(tone)) {
        tone = 0;
    } else {
        result = lowerCaseValue.substring(0, lowerCaseValue.length - 1);
    }

    const iV = lowerCaseValue.indexOf("v");
    if (iV >= 0) {
        result = setCharAt(result, iV, "\u00FC");
    }

    return [result, tone];
}
const addDiacritic = function (value: string, tone: number) {
    if (value === "ng") {
        switch (tone) {
            case 2: value = setCharAt(value, 0, "\u0144"); break;
            case 3: value = setCharAt(value, 0, "\u0148"); break;
            case 4: value += "\u0300"; break;
        }

        return value;
    }

    if (value === "m") {
        switch (tone) {
            case 2: value += "\u0301"; break;
            case 4: value += "\u0300"; break;
        }

        return value;
    }

    const iA = value.lastIndexOf("a");  // for Yale
    const iO = value.indexOf("o");
    const iE = value.indexOf("e");
    let iI = value.indexOf("i");
    let iU = value.indexOf("u");
    const iV = value.indexOf("\u00FC");
    const iIU = value.indexOf("iu");
    if (iIU >= 0) {
        iI = -1;
        iU = iIU + 1;
    }

    if (iA >= 0) {
        switch (tone) {
            case 1: value = setCharAt(value, iA, "\u0101"); break;
            case 2: value = setCharAt(value, iA, "\u00E1"); break;
            case 3: value = setCharAt(value, iA, "\u01CE"); break;
            case 4: value = setCharAt(value, iA, "\u00E0"); break;
        }
    }
    else if (iO >= 0) {
        switch (tone) {
            case 1: value = setCharAt(value, iO, "\u014D"); break;
            case 2: value = setCharAt(value, iO, "\u00F3"); break;
            case 3: value = setCharAt(value, iO, "\u01D2"); break;
            case 4: value = setCharAt(value, iO, "\u00F2"); break;
        }
    }
    else if (iE >= 0) {
        switch (tone) {
            case 1: value = setCharAt(value, iE, "\u0113"); break;
            case 2: value = setCharAt(value, iE, "\u00E9"); break;
            case 3: value = setCharAt(value, iE, "\u011B"); break;
            case 4: value = setCharAt(value, iE, "\u00E8"); break;
        }
    }
    else if (iI >= 0) {
        switch (tone) {
            case 1: value = setCharAt(value, iI, "\u012B"); break;
            case 2: value = setCharAt(value, iI, "\u00ED"); break;
            case 3: value = setCharAt(value, iI, "\u01D0"); break;
            case 4: value = setCharAt(value, iI, "\u00EC"); break;
        }
    }
    else if (iU >= 0) {
        switch (tone) {
            case 1: value = setCharAt(value, iU, "\u016B"); break;
            case 2: value = setCharAt(value, iU, "\u00FA"); break;
            case 3: value = setCharAt(value, iU, "\u01D4"); break;
            case 4: value = setCharAt(value, iU, "\u00F9"); break;
        }
    }
    else if (iV >= 0) {
        switch (tone) {
            case 1: value = setCharAt(value, iV, "\u01D6"); break;
            case 2: value = setCharAt(value, iV, "\u01D8"); break;
            case 3: value = setCharAt(value, iV, "\u01DA"); break;
            case 4: value = setCharAt(value, iV, "\u01DC"); break;
        }
    }
    return value;
};
export const convertPinyin = function (value: string) {
    const split = splitSound(value);
    const result = split[0];
    const tone = split[1];
    if (tone < 1 || tone > 5) {
        return result;
    }
    return addDiacritic(result, tone);
};