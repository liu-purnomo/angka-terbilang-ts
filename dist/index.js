"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var units = [
    '',
    'ribu',
    'juta',
    'milyar',
    'triliun',
    'quadriliun',
    'quintiliun',
    'sextiliun',
    'septiliun',
    'oktiliun',
    'noniliun',
    'desiliun',
    'undesiliun',
    'duodesiliun',
    'tredesiliun',
    'quattuordesiliun',
    'quindesiliun',
    'sexdesiliun',
    'septendesiliun',
    'oktodesiliun',
    'novemdesiliun',
    'vigintiliun',
];
var maxIndex = units.length - 1;
function digitToUnit(digit) {
    var currentIndex = Math.floor(digit / 3);
    return currentIndex <= maxIndex ? units[currentIndex] : units[maxIndex];
}
var numbers = [
    '',
    'satu',
    'dua',
    'tiga',
    'empat',
    'lima',
    'enam',
    'tujuh',
    'delapan',
    'sembilan',
];
function numberToText(index) {
    return numbers[index] || '';
}
function toWordsMain(number) {
    var numberLength = number.length;
    var numberMaxIndex = numberLength - 1;
    // Number Zero
    if (numberMaxIndex === 0 && Number(number[0]) === 0) {
        return 'nol';
    }
    var space = '';
    var result = '';
    var i = 0;
    while (i !== numberLength) {
        var digitCount = numberMaxIndex - i;
        var modGroup = digitCount % 3; // [2,1,0]
        var currentNumber = Number(number[i]);
        if (digitCount === 3 &&
            currentNumber === 1 &&
            (i === 0 || (Number(number[i - 2]) === 0 && Number(number[i - 1]) === 0))) {
            /* Number Seribu */
            result += "".concat(space, "seribu");
        }
        else {
            if (currentNumber !== 0) {
                if (modGroup === 0) {
                    /* Non-zero Satuan */
                    result += "".concat(space).concat(numberToText(currentNumber)).concat(i === numberMaxIndex ? '' : ' ').concat(digitToUnit(digitCount));
                }
                else if (modGroup === 2) {
                    /* Ratusan */
                    if (currentNumber === 1) {
                        result += "".concat(space, "seratus");
                    }
                    else {
                        result += "".concat(space).concat(numberToText(currentNumber), " ratus");
                    }
                }
                else {
                    /* Puluhan dan Belasan */
                    if (currentNumber === 1) {
                        i++; // Skip Next Number
                        var nextNumber = Number(number[i]);
                        if (nextNumber === 0) {
                            result += "".concat(space, "sepuluh");
                            /* Process Next Number Now */
                            if (digitCount !== 1 &&
                                (Number(number[i - 2]) !== 0 || Number(number[i - 1]) !== 0)) {
                                result += " ".concat(digitToUnit(digitCount - 1));
                            }
                        }
                        else {
                            if (nextNumber === 1) {
                                result += "".concat(space, "sebelas");
                            }
                            else {
                                result += "".concat(space).concat(numberToText(nextNumber), " belas");
                            }
                            /* Process Next Number Now */
                            if (digitCount !== 1) {
                                result += " ".concat(digitToUnit(digitCount - 1));
                            }
                        }
                    }
                    else {
                        /* Puluhan */
                        result += "".concat(space).concat(numberToText(currentNumber), " puluh");
                    }
                }
            }
            else {
                /* Zero Satuan */
                if (modGroup === 0 &&
                    (Number(number[i - 2]) !== 0 || Number(number[i - 1]) !== 0) &&
                    digitCount !== 0) {
                    result += " ".concat(digitToUnit(digitCount));
                }
            }
        }
        if (i <= 1) {
            space = ' ';
        }
        i++;
    }
    return result;
}
function toWordsSingleDigit(number) {
    return number
        .split('')
        .map(function (num) { return (num == '0' ? 'nol' : numberToText(Number(num))); })
        .join(' ');
}
function toWords(target, settings) {
    if (settings === void 0) { settings = { decimal: '.' }; }
    if (typeof target !== 'string')
        target = String(target);
    if (target.indexOf(settings.decimal) > -1) {
        /* With Decimal */
        var parts = target.split(settings.decimal);
        return "".concat(toWordsMain(parts[0]), " koma ").concat(toWordsSingleDigit(parts[1]));
    }
    else {
        /* Without Decimal */
        return toWordsMain(target);
    }
}
exports.default = toWords;
