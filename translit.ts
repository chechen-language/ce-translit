/**
 * This module provides a transliteration mapping and a function to apply transliteration
 * based on a predefined mapping from one script to another.
 * 
 * Demo: https://chechen-language.github.io/repositories/chechen-transliterator/?text=дӏахьаьдира
 * 
 * @module translit
 * 
 * @example
 * ```js
 * import { apply, translitMap } from "@ce/transliteration";
 * 
 * const result = apply('дӏахьаьдира');
 * console.log(result); // 'djaẋädira'
 * 
 * console.log(translitMap);
 * 
 * ```
 */

/**
 * A mapping of characters from one script to another.
 * The keys are the original characters, and the values are the corresponding transliterated characters.
 * @constant {Object.<string, string>}
 */
export const translitMap: { [key: string]: string } = {
  "а": "a", "А": "A",
  "аь": "ä", "Аь": "Ä", "аЬ": "ä", "АЬ": "Ä",
  "б": "b", "Б": "B",
  "в": "v", "В": "V",
  "г": "g", "Г": "G",
  "гӏ": "ġ", "Гӏ": "Ġ", "гӀ": "ġ", "ГӀ": "Ġ",
  "ц": "c", "Ц": "C",
  "цӏ": "ċ", "Цӏ": "Ċ", "цӀ": "ċ", "ЦӀ": "Ċ",
  "д": "d", "Д": "D",
  "е": "e", "Е": "E",
  "ё": "ö", "Ё": "Ö",
  "ж": "ƶ", "Ж": "Ƶ",
  "з": "z", "З": "Z",
  "и": "i", "И": "I",
  "й": "y", "Й": "Y",
  "к": "k", "К": "K",
  "кх": "q", "Кх": "Q", "кХ": "q", "КХ": "Q",
  "къ": "q̇", "Къ": "Q̇", "кЪ": "q̇", "КЪ": "Q̇",
  "кӏ": "k̇", "Кӏ": "K̇", "кӀ": "k̇", "КӀ": "K̇",
  "л": "l", "Л": "L",
  "м": "m", "М": "M",
  "н": "n", "Н": "N",
  "о": "o", "О": "O",
  "оь": "ö", "Оь": "Ö", "оЬ": "ö", "ОЬ": "Ö",
  "п": "p", "П": "P",
  "пӏ": "ṗ", "Пӏ": "Ṗ", "пӀ": "ṗ", "ПӀ": "Ṗ",
  "р": "r", "Р": "R",
  "с": "s", "С": "S",
  "т": "t", "Т": "T",
  "тӏ": "ṫ", "Тӏ": "Ṫ", "тӀ": "ṫ", "ТӀ": "Ṫ",
  "у": "u", "У": "U",
  "уь": "ü", "Уь": "Ü", "уЬ": "ü", "УЬ": "Ü",
  "ф": "f", "Ф": "F",
  "х": "x", "Х": "X",
  "хь": "ẋ", "Хь": "Ẋ", "хЬ": "ẋ", "ХЬ": "Ẋ",
  "хӏ": "h", "Хӏ": "H", "хӀ": "h", "ХӀ": "H",
  "ч": "ç", "Ч": "Ç",
  "чӏ": "ç̇", "Чӏ": "Ç̇", "чӀ": "ç̇", "ЧӀ": "Ç̇",
  "ш": "ş", "Ш": "Ş",
  "щ": "ş", "Щ": "Ş",
  "ъ": "ə", "Ъ": "Ə",
  "ы": "", "Ы": "",
  "ь": "", "Ь": "",
  "э": "e", "Э": "E",
  "ю": "yu", "Ю": "Yu",
  "я": "ya", "Я": "Ya",
  "ӏ": "j", "Ӏ": "J",
  "ггӏ": "ġġ", "Ггӏ": "Ġġ", "гГӏ": "ġĠ", "ГГӏ": "ĠĠ", "ГГӀ": "ĠĠ", "гГӀ": "ġĠ", "ГгӀ": "Ġġ", "ггӀ": "ġġ",
  "ккх": "qq", "Ккх": "Qq", "кКх": "qQ", "ККх": "QQ", "ККХ": "QQ", "кКХ": "qQ", "КкХ": "Qq", "ккХ": "qq",
  "ккъ": "q̇q̇", "Ккъ": "Q̇q̇", "кКъ": "q̇Q̇", "ККъ": "Q̇Q̇", "ККЪ": "Q̇Q̇", "кКЪ": "q̇Q̇", "КкЪ": "Q̇q̇", "ккЪ": "q̇q̇",
  "ттӏ": "ṫṫ", "Ттӏ": "Ṫṫ", "тТӏ": "ṫṪ", "ТТӏ": "ṪṪ", "ТТӀ": "ṪṪ", "тТӀ": "ṫṪ", "ТтӀ": "Ṫṫ", "ттӀ": "ṫṫ",
  "ххь": "ẋẋ", "Ххь": "Ẋẋ", "хХь": "ẋẊ", "ХХь": "ẊẊ", "ХХЬ": "ẊẊ", "хХЬ": "ẋẊ", "ХхЬ": "Ẋẋ", "ххЬ": "ẋẋ",
  "ххӏ": "hh", "Ххӏ": "Hh", "хХӏ": "hH", "ХХӏ": "HH", "ХХӀ": "HH", "хХӀ": "hH", "ХхӀ": "Hh", "ххӀ": "hh",
  "юь": "yü", "Юь": "Yü", "юЬ": "yü", "ЮЬ": "Yü",
  "яь": "yä", "Яь": "Yä", "яЬ": "yä", "ЯЬ": "Yä"
};

/**
 * Applies transliteration to a given word using the predefined transliteration mapping.
 * 
 * @param {string} word - The word to be transliterated.
 * @returns {string} - The transliterated word.
 * 
 * @example
 * ```js
 * const result = applyToWord('дӏахьаьдира');
 * console.log(result); // prints 'djaẋädira'
 * ```
 */
export function applyToWord(word: string): string {
  let result: string = '';
  let i: number = 0;
  while (i < word.length) {
    let match: string | null = null;
    for (let key of [
      word.substring(i, i + 3),
      word.substring(i, i + 2),
      word.substring(i, i + 1),
    ]) {
      if (translitMap.hasOwnProperty(key)) {
        const preLetter = i > 0 ? word[i - 1].toLowerCase() : '';
        const nextLetter = i + 1 < word.length ? word[i + 1] : '';
        // if key is 'ъ' and next character is 'е', 'ё', 'ю', or 'я'
        if ((key === 'ъ' || key === 'Ъ') && 'еёюяЕЁЮЯ'.includes(nextLetter)) {
          // if 'к' is before 'ъ', transliterate 'ъ' as 'q̇'
          if (i > 0 && (preLetter === 'к')) {
            match = word[i - 1] === 'к' ? 'q̇' : 'Q̇';
          } else {
            match = ''; // else skip 'ъ'
          }
        } else if (key === 'е' || key === 'Е') {
          if (i === 0) {
            match = key === 'е' ? 'ye' : (nextLetter && nextLetter.toUpperCase() === nextLetter ? 'YE' : 'Ye'); // 'е' at the start of the word
          } else if (i > 0) {
            const preConsonant = i > 1 ? word.substring(i - 2, i).toLowerCase() : '';
            if ((preLetter === 'ъ') && (i < 2 || preConsonant !== 'къ')) {
              // 'е' following 'ъ' that does not follow 'къ'
              match = key === 'е' ? 'ye' : (nextLetter && nextLetter.toUpperCase() === nextLetter ? 'YE' : 'Ye');
            } else {
              match = translitMap[key]; // Regular transliteration for 'е'
            }
          } else {
            match = translitMap[key];
          }
        } else if ((key === 'н' || key === 'Н') && i === word.length - 1) {
          match = key === 'н' ? 'ŋ' : 'Ŋ'; // 'н' at the end of the word
        } else {
          match = translitMap[key];
        }
        if (match !== null) {
          result += match;
          i += key.length;
          break;
        }
      }
    }
    if (match === null) {
      result += word[i]; // Add the character as is if no match was found
      i++; // Move to next character
    }
  }
  return result;
}

/**
 * Applies transliteration to a given text, handling multiple words.
 * 
 * @param {string} text - The text to be transliterated.
 * @returns {string} - The transliterated text.
 * 
 * @example
 * ```js
 * const result = apply('Мелхо а, шуна цхьанна а тхайх бала ца бархьама, дийнахь а, буса а, къа а хьоьгуш, болх бора оха.');
 * console.log(result); // prints 'Melxo ə, şuna cẋanna ə txayx bala ca barẋama, diynaẋ ə, busa ə, q̇a ə ẋöguş, bolx bora oxa.'
 * ```
 */
export function apply(text: string): string {
  // Replace any standalone Cyrillic 'а' with 'ə'
  const regex = /(^|\s)а(?=\s|[.,!?;:]|$)/g;
  const modifiedText = text.replace(regex, '$1ə');

  const words = modifiedText.split(' ');
  const transliteratedWords = words.map(word => applyToWord(word));
  return transliteratedWords.join(' ');
}
