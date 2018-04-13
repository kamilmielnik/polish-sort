# polish-sort
## Description
Comparator functions for dealing with Polish accented characters when sorting in JavaScript. Features 100% test coverage. Since JavaScript sorting is not stable, I encourage you to use it with [stable](https://www.npmjs.com/package/stable).

## Why
JavaScript fails to sort polish characters properly. Example:
```
[ 'la', 'łb', 'lc' ].sort(); // ["la", "lc", "łb"]
```
There is `String.prototype.localeCompare` to deal with localized comparisons, but it does not work as one would expect it to:
```
[ 'la', 'łb', 'lc' ].sort((a, b) => a.localeCompare(b)); // ["la", "łb", "lc"]
```
At the time I'm writing this (2018/04/13), none of `String.prototype.localeCompare` options seem to produce the desired result (`["la", "lc", "łb"]`) in Google Chrome (65.0.3325.181) or Electron (1.8.4). So I have created this library.

## Installation
```
npm install --save polish-sort
```

## API
There are 3 functions:

#### `caseInsensitiveComparator`
Useful when you want to sort an `Array` of `String`. Just pass the reference as an argument to `Array.prototype.sort`.
```javascript
import { caseInsensitiveComparator } from 'polish-sort';

[ 'łc', 'Ła', 'łb' ].sort(caseInsensitiveComparator); // ["Ła", "łb", "łc"]
```

#### `caseSensitiveComparator`
Useful when you want to sort an `Array` of `String`. Just pass the reference as an argument to `Array.prototype.sort`.
```javascript
import { caseSensitiveComparator } from 'polish-sort';

[ 'łc', 'Ła', 'łb' ].sort(caseSensitiveComparator); // ["łb", "łc", "Ła"]
```

#### `createComparator(options)`
Useful when you want to sort an `Array` of `Object` by some attribute. Returns a comparator. Accepts 1 optional argument of type `Object` with the following (both optional) attributes:
- `getter` - `Function` - default: `(x) => x`
- `ignoreCase` - `Boolean` - default: `false`

```javascript
import { createComparator } from 'polish-sort';

const comparator = createComparator({
  getter: (value) => value.name,
  ignoreCase: true
});

[
  { name: 'la' },
  { name: 'łb' },
  { name: 'lc' }
].sort(comparator);
// [
//   { name: "la" },
//   { name: "lc" },
//   { name: "łb" }
// ]
```
