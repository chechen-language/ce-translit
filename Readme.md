# @ce/transliteration

![Build and Publish](https://github.com/chechen-language/ce-translit/actions/workflows/publish.yml/badge.svg)

A JavaScript library for transliterating Chechen text written in Cyrillic script to Latin script using a predefined mapping.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Special Handling](#special-handling)
- [Examples](#examples)
- [Configuration](#configuration)
- [Development](#development)
- [License](#license)

## Introduction

`@ce/transliteration` is a library that provides an easy way to transliterate Chechen text from Cyrillic to Latin script based on a predefined mapping. The transliteration is designed to accurately represent Chechen phonetics in Latin script. 

### Demo

Check out the [live demo](https://chechen-language.github.io/repositories/chechen-transliterator/?text=дӏахьäдира) to see the transliteration in action.

## Features
- Transliterates Chechen text from Cyrillic to Latin script.
- Special handling for specific characters, including contextual rules.
- Configurable transliteration mapping.
- Provides a comprehensive set of tools for Chechen language processing.

## Installation

To install `@ce/transliteration`, use npm or yarn:

```bash
npx jsr add @ce/transliteration
```

or

```bash
yarn dlx jsr add @ce/transliteration
```

or

```bash
deno add @ce/transliteration
```

## Usage

Here's how to use the transliteration library in your JavaScript or TypeScript project:

```javascript
import { apply, translitMap } from "@ce/transliteration";

const result = apply('дӏахьäдира');
console.log(result); // Output: 'djaẋädira'

console.log(translitMap);
```

## Special Handling

The library includes some specific handling for the character 'н':

1. **End of Word**: If 'н' appears at the end of a word, it is generally transliterated as 'ŋ'.
2. **Blacklist**: If the word is in a predefined blacklist, 'н' is transliterated as 'n'.
3. **Uncertain List**: If the word is in the "unsureList", 'н' is transliterated as 'ŋ[REPLACE]' to indicate that manual review is needed.

## Examples

### Example 1

Transliterate a Chechen text:

```javascript
import { apply } from "@ce/transliteration";

const text = 'дӏахьäдира';
const transliteratedText = apply(text);
console.log(transliteratedText); // Output: 'djaẋädira'
```

### Example 2

Transliterate a Chechen text with special handling:

```javascript
import { apply } from "@ce/transliteration";

const text = 'шун';
const transliteratedText = apply(text);
console.log(transliteratedText); // Output: 'şuŋ[REPLACE]'
```

## Configuration

The transliteration rules are defined in a mapping object (`translitMap`). You can view or modify the transliteration mapping according to your needs. For more information, check the `translit.ts` file in the repository.

## Development

### Project Structure

```bash
.
├── .github
│   └── workflows
│       └── publish.yml
├── __tests__
│   └── translit.test.ts
├── .gitignore
├── jest.config.js
├── jsr.json
└── translit.ts
```

- **`.github/workflows/publish.yml`**: CI/CD configuration for building and publishing the package.
- **`__tests__/translit.test.ts`**: Test cases for the transliteration logic.
- **`translit.ts`**: Core library file containing the transliteration logic and mapping.
- **`jest.config.js`**: Jest configuration for running tests.
- **`jsr.json`**: Contains metadata for the JavaScript Registry.

### Running Tests

This project uses [Jest](https://jestjs.io/) for testing. To run the test suite with coverage reports, use the following command:

```bash
jest --coverage
```

## License

This project is licensed under the [MIT License](LICENSE).
