/**
 * This module provides a transliteration mapping and a function to apply transliteration
 * based on a predefined mapping from one script to another.
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
 * ```
 */

/**
 * A mapping of characters from one script to another.
 * The keys are the original characters, and the values are the corresponding transliterated characters.
 * @constant {Object.<string, string>}
 */
export const translitMap: { [key: string]: string } = {
  'а': 'a', 'А': 'A', 'аь': 'ä', 'Аь': 'Ä', 'б': 'b', 'Б': 'B', 'в': 'v', 'В': 'V',
  'г': 'g', 'Г': 'G', 'гӏ': 'ġ', 'Гӏ': 'Ġ', 'гІ': 'ġ', 'ГІ': 'Ġ', 'ц': 'c', 'Ц': 'C',
  'цӏ': 'ċ', 'Цӏ': 'Ċ', 'цІ': 'ċ', 'ЦІ': 'Ċ', 'д': 'd', 'Д': 'D', 'е': 'e', 'Е': 'E',
  'ё': 'ö', 'Ё': 'Ö', 'ж': 'ƶ', 'Ж': 'Ƶ', 'з': 'z', 'З': 'Z', 'и': 'i', 'И': 'I',
  'й': 'y', 'Й': 'Y', 'к': 'k', 'К': 'K', 'кх': 'q', 'Кх': 'Q', 'кХ': 'q', 'КХ': 'Q',
  'къ': 'q̇', 'Къ': 'Q̇', 'кЪ': 'q̇', 'КЪ': 'Q̇', 'кӏ': 'k̇', 'Кӏ': 'K̇', 'кІ': 'k̇', 'КІ': 'K̇',
  'л': 'l', 'Л': 'L', 'м': 'm', 'М': 'M', 'н': 'n', 'Н': 'N', 'о': 'o', 'О': 'O',
  'оь': 'ö', 'Оь': 'Ö', 'п': 'p', 'П': 'P', 'пӏ': 'ṗ', 'Пӏ': 'Ṗ', 'пІ': 'ṗ', 'ПІ': 'Ṗ',
  'р': 'r', 'Р': 'R', 'с': 's', 'С': 'S', 'т': 't', 'Т': 'T', 'тӏ': 'ṫ', 'Тӏ': 'Ṫ',
  'тІ': 'ṫ', 'ТІ': 'Ṫ', 'у': 'u', 'У': 'U', 'уь': 'ü', 'Уь': 'Ü', 'ф': 'f', 'Ф': 'F',
  'х': 'x', 'Х': 'X', 'хь': 'ẋ', 'Хь': 'Ẋ', 'хЬ': 'ẋ', 'ХЬ': 'Ẋ', 'хӏ': 'h', 'Хӏ': 'H',
  'хІ': 'h', 'ХІ': 'H', 'ч': 'ç', 'Ч': 'Ç', 'чӏ': 'ç̇', 'Чӏ': 'Ç̇', 'чІ': 'ç̇', 'ЧІ': 'Ç̇',
  'ш': 'ş', 'Ш': 'Ş', 'щ': 'ş', 'Щ': 'Ş', 'ъ': 'ə', 'Ъ': 'Ə', 'ы': '', 'Ы': '', 'ь': '', 'Ь': '',
  'э': 'e', 'Э': 'E', 'ю': 'yu', 'Ю': 'Yu', 'я': 'ya', 'Я': 'Ya', 'ӏ': 'j', 'Ӏ': 'J',
  'ккх': 'qq', 'Ккх': 'Qq', 'кКх': 'qq', 'ККх': 'Qq', 'ККХ': 'QQ', 'ккъ': 'q̇q̇', 'Ккъ': 'Q̇q̇',
  'кКъ': 'q̇q̇', 'ККъ': 'Q̇q̇', 'ККЪ': 'Q̇Q̇', 'юь': 'yü', 'Юь': 'Yü', 'яь': 'yä', 'Яь': 'Yä'
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
        // if key is 'ъ' and next character is 'е', 'ё', 'ю', or 'я'
        if ((key === 'ъ' || key === 'Ъ') && i + 1 < word.length && 'еёюяЕЁЮЯ'.includes(word[i + 1])) {
          // if 'к' is before 'ъ', transliterate 'ъ' as 'q̇'
          if (i > 0 && word[i - 1].toLowerCase() === 'к') {
            match = 'q̇';
          } else {
            match = ''; // else skip 'ъ'
          }
        } else if (key === 'е' || key === 'Е') {
          if (i === 0) {
            match = key === 'е' ? 'ye' : 'Ye'; // 'е' at the start of the word
          } else if (i > 0) {
            if ((word[i - 1] === 'ъ' || word[i - 1] === 'Ъ') && (i < 2 || (word.substring(i - 2, i) !== 'къ' && word.substring(i - 2, i) !== 'Къ'))) {
              match = key === 'е' ? 'ye' : 'Ye'; // 'е' following 'ъ' that does not follow 'къ'
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
 * console.log(result); // prints 'melxo ə, şuna cẋanna ə txayx bala ca barẋama, diynaẋ ə, busa ə, q̇a ə ẋöguş, bolx bora oxa.'
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
