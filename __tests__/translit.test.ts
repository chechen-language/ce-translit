import { apply, applyToWord, translitMap } from '../translit';

describe('translitMap', () => {
  it('should contain mapping for Cyrillic "а" and "А"', () => {
    expect(translitMap['а']).toBe('a');
    expect(translitMap['А']).toBe('A');
  });
});

describe('applyToWord', () => {
  it('should transliterate a word correctly', () => {
    expect(applyToWord('дӏахь')).toBe('djaẋ');
    expect(applyToWord('доьгӏна')).toBe('döġna');
  });

  it('should handle words with special cases', () => {
    expect(applyToWord('тӏ')).toBe('ṫ');
    expect(applyToWord('къ')).toBe('q̇');
  });

  it('should handle uppercase words correctly', () => {
    expect(applyToWord('Д')).toBe('D');
    expect(applyToWord('Т')).toBe('T');
  });

  it('should handle mixed case words correctly', () => {
    expect(applyToWord('КъХ')).toBe('Q̇X');
  });

  it('should handle words with standalone Cyrillic "ъ"', () => {
    expect(applyToWord('къе')).toBe('q̇e');
    expect(applyToWord('Къе')).toBe('Q̇e');
  });

  it('should handle words with Cyrillic "ъ" before "е", "ё", "ю", or "я"', () => {
    expect(applyToWord('къе')).toBe('q̇e');
    expect(applyToWord('къё')).toBe('q̇ö');
    expect(applyToWord('къю')).toBe('q̇yu');
    expect(applyToWord('къя')).toBe('q̇ya');
    expect(applyToWord('къЕ')).toBe('q̇E');
    expect(applyToWord('къЁ')).toBe('q̇Ö');
    expect(applyToWord('къЮ')).toBe('q̇Yu');
    expect(applyToWord('къЯ')).toBe('q̇Ya');
  });

  it('should handle "ъ" not preceded by "к" correctly', () => {
    expect(applyToWord('ъе')).toBe('ye');
    expect(applyToWord('Ъё')).toBe('ö');
    expect(applyToWord('ъю')).toBe('yu');
    expect(applyToWord('ъя')).toBe('ya');
  });

  it('should handle "ъ" preceded by a non-"к" character correctly', () => {
    expect(applyToWord('мъе')).toBe('mye');
    expect(applyToWord('Мъё')).toBe('Mö');
    expect(applyToWord('пъю')).toBe('pyu');
    expect(applyToWord('съя')).toBe('sya');
  });

  it('should handle words with "е" at the start correctly', () => {
    expect(applyToWord('е')).toBe('ye');
    expect(applyToWord('Е')).toBe('Ye');
  });

  it('should handle words with "н" at the end correctly', () => {
    expect(applyToWord('тхан')).toBe('txaŋ');
    expect(applyToWord('тхаН')).toBe('txaŊ');
  });

  it('should handle words without any special transliteration cases', () => {
    expect(applyToWord('нанас')).toBe('nanas');
  });
});

describe('apply', () => {
  it('should transliterate a text correctly', () => {
    const text = 'Мелхо а, шуна цхьанна а тхайх бала ца бархьама, дийнахь а, буса а, къа а хьоьгуш, болх бора оха.';
    const expected = 'Melxo ə, şuna cẋanna ə txayx bala ca barẋama, diynaẋ ə, busa ə, q̇a ə ẋöguş, bolx bora oxa.';
    expect(apply(text)).toBe(expected);
  });
  it('should transliterate a text correctly', () => {
    const text = 'чекхъели чекХъели чекхЪели чекХЪели чекхъЕли чекХъЕли чекхЪЕли чекХЪЕли ЧЕКХЪЕЛИ Чекхъели';
    const expected = 'çeqyeli çeqyeli çeqyeli çeqyeli çeqYeli çeqYeli çeqYeli çeqYeli ÇEQYELI Çeqyeli';
    expect(apply(text)).toBe(expected);
  });
  it('should transliterate a text correctly', () => {
    const text = "къегина Къегина кЪегина КЪегина къЕгина КъЕгина кЪЕгина КЪЕгина КЪЕГИНА Къегина";
    const expected = 'q̇egina Q̇egina q̇egina Q̇egina q̇Egina Q̇Egina q̇Egina Q̇Egina Q̇EGINA Q̇egina';
    expect(apply(text)).toBe(expected);
  });

  it('should replace standalone Cyrillic "а" with "ə"', () => {
    expect(apply('дӏахь а доьгӏна')).toBe('djaẋ ə döġna');
  });

  it('should handle mixed case texts correctly', () => {
    expect(apply('Дӏахь А доьгӏна')).toBe('Djaẋ A döġna');
  });

  it('should handle texts with punctuation', () => {
    expect(apply('а, а. а!')).toBe('ə, ə. ə!');
  });

  it('should handle texts with hyphens correctly', () => {
    expect(apply('доьгӏна-шун')).toBe('döġna-şuŋ');
  });

  it('should handle empty strings', () => {
    expect(apply('')).toBe('');
  });

  it('should handle texts with no Cyrillic characters', () => {
    expect(apply('Hello world!')).toBe('Hello world!');
  });
});