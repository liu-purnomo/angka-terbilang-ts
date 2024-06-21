const units: string[] = [
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
const maxIndex: number = units.length - 1;

function digitToUnit(digit: number): string {
  const currentIndex: number = Math.floor(digit / 3);
  return currentIndex <= maxIndex ? units[currentIndex] : units[maxIndex];
}

const numbers: string[] = [
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

function numberToText(index: number): string {
  return numbers[index] || '';
}

function toWordsMain(number: string): string {
  const numberLength: number = number.length;
  const numberMaxIndex: number = numberLength - 1;

  // Number Zero
  if (numberMaxIndex === 0 && Number(number[0]) === 0) {
    return 'nol';
  }

  let space: string = '';
  let result: string = '';

  let i: number = 0;
  while (i !== numberLength) {
    const digitCount: number = numberMaxIndex - i;
    const modGroup: number = digitCount % 3; // [2,1,0]
    const currentNumber: number = Number(number[i]);

    if (
      digitCount === 3 &&
      currentNumber === 1 &&
      (i === 0 || (Number(number[i - 2]) === 0 && Number(number[i - 1]) === 0))
    ) {
      /* Number Seribu */
      result += `${space}seribu`;
    } else {
      if (currentNumber !== 0) {
        if (modGroup === 0) {
          /* Non-zero Satuan */
          result += `${space}${numberToText(currentNumber)}${
            i === numberMaxIndex ? '' : ' '
          }${digitToUnit(digitCount)}`;
        } else if (modGroup === 2) {
          /* Ratusan */
          if (currentNumber === 1) {
            result += `${space}seratus`;
          } else {
            result += `${space}${numberToText(currentNumber)} ratus`;
          }
        } else {
          /* Puluhan dan Belasan */
          if (currentNumber === 1) {
            i++; // Skip Next Number
            const nextNumber: number = Number(number[i]);
            if (nextNumber === 0) {
              result += `${space}sepuluh`;
              /* Process Next Number Now */
              if (
                digitCount !== 1 &&
                (Number(number[i - 2]) !== 0 || Number(number[i - 1]) !== 0)
              ) {
                result += ` ${digitToUnit(digitCount - 1)}`;
              }
            } else {
              if (nextNumber === 1) {
                result += `${space}sebelas`;
              } else {
                result += `${space}${numberToText(nextNumber)} belas`;
              }
              /* Process Next Number Now */
              if (digitCount !== 1) {
                result += ` ${digitToUnit(digitCount - 1)}`;
              }
            }
          } else {
            /* Puluhan */
            result += `${space}${numberToText(currentNumber)} puluh`;
          }
        }
      } else {
        /* Zero Satuan */
        if (
          modGroup === 0 &&
          (Number(number[i - 2]) !== 0 || Number(number[i - 1]) !== 0) &&
          digitCount !== 0
        ) {
          result += ` ${digitToUnit(digitCount)}`;
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

function toWordsSingleDigit(number: string): string {
  return number
    .split('')
    .map((num) => (num == '0' ? 'nol' : numberToText(Number(num))))
    .join(' ');
}

function toWords(target: string | number, settings = { decimal: '.' }): string {
  if (typeof target !== 'string') target = String(target);
  if (target.indexOf(settings.decimal) > -1) {
    /* With Decimal */
    const parts = target.split(settings.decimal);
    return `${toWordsMain(parts[0])} koma ${toWordsSingleDigit(parts[1])}`;
  } else {
    /* Without Decimal */
    return toWordsMain(target);
  }
}

export default toWords;
