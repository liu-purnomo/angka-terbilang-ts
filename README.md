# Terbilang-TS - Indonesian Number to Words Converter

`angka-terbilang-ts` is a TypeScript library that converts numbers into words in Indonesian. This library is highly useful for applications that require a textual representation of numbers, such as financial reporting, check writing systems, and more.

## Features

- Converts whole and decimal numbers into words.
- Supports numbers up to `vigintillion`.
- Easy to use and integrate into TypeScript or JavaScript projects.

## Installation

You can install this library via npm:

```bash
npm install angka-terbilang-ts
```

## Usage

Here is a basic example of how to use this library in a TypeScript project:

### TypeScript

```typescript
import toWords from 'angka-terbilang-ts';

const number = 1234;
console.log(toWords(number)); // Output: "seribu dua ratus tiga puluh empat"

const decimalNumber = '1234.56';
console.log(toWords(decimalNumber)); // Output: "seribu dua ratus tiga puluh empat koma lima enam"
```

### JavaScript

```javascript
const toWords = require('angka-terbilang-ts').default;

const number = 1234;
console.log(toWords(number)); // Output: "seribu dua ratus tiga puluh empat"

const decimalNumber = '1234.56';
console.log(toWords(decimalNumber)); // Output: "seribu dua ratus tiga puluh empat koma lima enam"
```

## API

### `toWords(target: string | number, settings?: { decimal: string }): string`

Converts numbers into words in Indonesian.

#### Parameters

- `target` - The number to be converted. Can be a string or number.
- `settings` - (Optional) Configuration object to set the decimal separator. Default is `{ decimal: '.' }`.

#### Returns

Returns the textual representation of the given number.

## Testing

This library uses Jest for testing. To run the tests, follow these steps:

1. **Install dependencies for testing:**

   ```bash
   npm install --save-dev jest ts-jest @types/jest
   ```

2. **Initialize Jest configuration:**

   ```bash
   npx ts-jest config:init
   ```

3. **Run tests:**

   ```bash
   npm test
   ```

### Example Tests

Here are some example tests to ensure the library functions correctly:

```typescript
import toWords from '../src/index';

describe('toWords', () => {
  it('should convert single digit numbers to words', () => {
    expect(toWords(1)).toBe('satu');
    expect(toWords(5)).toBe('lima');
  });

  it('should convert tens to words', () => {
    expect(toWords(10)).toBe('sepuluh');
    expect(toWords(11)).toBe('sebelas');
    expect(toWords(21)).toBe('dua puluh satu');
  });

  it('should convert hundreds to words', () => {
    expect(toWords(100)).toBe('seratus');
    expect(toWords(105)).toBe('seratus lima');
    expect(toWords(123)).toBe('seratus dua puluh tiga');
  });

  it('should convert thousands to words', () => {
    expect(toWords(1000)).toBe('seribu');
    expect(toWords(1001)).toBe('seribu satu');
    expect(toWords(1234)).toBe('seribu dua ratus tiga puluh empat');
  });

  it('should convert large numbers to words', () => {
    expect(toWords(1000000)).toBe('satu juta');
    expect(toWords(1000000000)).toBe('satu milyar');
  });

  it('should handle decimals', () => {
    expect(toWords('1234.56')).toBe('seribu dua ratus tiga puluh empat koma lima enam');
  });
});
```

## Contribution

Contributions are welcome! If you have suggestions, bug reports, or new features to add, please open an issue or pull request on the [GitHub repository](https://github.com/liu-purnomo/angka-terbilang-ts).

## License

This project is licensed under the ISC License. See the [LICENSE](./LICENSE) file for more details.

## Repository

- **Repository:** [https://github.com/liu-purnomo/angka-terbilang-ts](https://github.com/liu-purnomo/angka-terbilang-ts)
- **Bugs:** [https://github.com/liu-purnomo/angka-terbilang-ts/issues](https://github.com/liu-purnomo/angka-terbilang-ts/issues)
- **Homepage:** [https://github.com/liu-purnomo/angka-terbilang-ts#readme](https://github.com/liu-purnomo/angka-terbilang-ts#readme)
- **Author:** [liupurnomo.com](https://liupurnomo.com)
