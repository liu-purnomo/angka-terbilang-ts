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
    expect(toWords('1234.56')).toBe(
      'seribu dua ratus tiga puluh empat koma lima enam'
    );
  });
});
