/**
 * This module provides a transliteration mapping and a function to apply transliteration
 * based on a predefined mapping from one script to another.
 * 
 * @module translit
 * 
 * @example
 * ```js
 * import { apply, translitMap } from 'translit';
 * 
 * const result = apply('дӏахьаьдира');
 * console.log(result); // 'djaẋädira'
 * 
 * console.log(translitMap);
 * ```
 */

/**
 * A mapping of characters from one script to another.
 * The keys are the original characters, and the values are the corresponding transliterated characters.
 * @constant {Object.<string, string>}
 */
export const translitMap: { [key: string]: string } = {
  'а': 'a', 'аь': 'ä', 'б': 'b', 'в': 'v', 'г': 'g', 'гӏ': 'ġ', 'ц': 'c', 'цӏ': 'ċ', 'д': 'd',
  'е': 'e', 'ё': 'ö', 'ж': 'ƶ', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'кх': 'q', 'къ': 'q̇',
  'кӏ': 'k̇', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'оь': 'ö', 'п': 'p', 'пӏ': 'ṗ', 'р': 'r',
  'с': 's', 'т': 't', 'тӏ': 'ṫ', 'у': 'u', 'уь': 'ü', 'ф': 'f', 'х': 'x', 'хь': 'ẋ', 'хӏ': 'h',
  'ч': 'ç', 'чӏ': 'ç̇', 'ш': 'ş', 'щ': 'ş', 'ъ': 'ə', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
  'ӏ': 'j', 'Ӏ': 'J', 'ккх': 'qq', 'ккъ': 'q̇q̇', 'юь': 'yü', 'яь': 'yä'
};

/**
 * Applies transliteration to a given word using the predefined transliteration mapping.
 * 
 * @param {string} word - The word to be transliterated.
 * @returns {string} - The transliterated word.
 * 
 * @example
 * ```js
 * const result = apply('дӏахьаьдира');
 * console.log(result); // prints 'djaẋädira'
 * ```
 */
export function apply(word: string): string {
  const w: string = word.toLowerCase();
  let result: string = '';
  let i: number = 0;
  while (i < w.length) {
    let match: string | null = null;
    for (let key of [
      w.substring(i, i + 3),
      w.substring(i, i + 2),
      w.substring(i, i + 1),
    ]) {
      if (translitMap.hasOwnProperty(key)) {
        if (key === 'ъ' && i + 1 < w.length && 'еёюя'.includes(w[i + 1])) {
          if (i > 0 && w[i - 1] === 'к') {
            match = 'q̇';
          } else {
            match = ''; // 'ъ' is null before these characters unless after 'к'
          }
        } else if (key === 'е') {
          if (i === 0) {
            match = 'ye'; // 'е' at the start of the word
          } else if (i > 0) {
            if (w[i - 1] === 'ъ' && (i < 2 || w.substring(i - 2, i) !== 'къ')) {
              match = 'ye'; // 'е' following 'ъ' that does not follow 'къ'
            } else {
              match = translitMap[key]; // Regular transliteration for 'е'
            }
          } else {
            match = translitMap[key];
          }
        } else if (key === 'н' && i === w.length - 1) {
          match = 'ŋ'; // 'н' at the end of the word
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
      result += w[i]; // Add the character as is if no match was found
      i++; // Move to next character
    }
  }
  return result;
}