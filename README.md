# polish-sort
## Description
Comparator functions for dealing with Polish accented characters when sorting in JavaScript. Features 100% test coverage.

## Why
JavaScript fails to sort polish characters properly. Example:
```
[ 'la', 'łb', 'z' ].sort(); // ["la", "z", "łb"]
```
Now, there is `String.prototype.localeCompare` to deal with localized comparisons:
```
[ 'la', 'łb', 'z' ].sort((a, b) => a.localeCompare(b, 'pl')); // ["la", "z", "łb"]
```
Unfortunately, it does not work in older browsers, such as IE <= 10 or Safari <= 9.1.

## Installation
```
npm install --save polish-sort
```

## API
#### `caseInsensitiveComparator(a, b)`
Useful when you want to sort an `Array` of `String`. Just pass the reference as an argument to `Array.prototype.sort`.
```javascript
import { caseInsensitiveComparator } from 'polish-sort';

[ 'łc', 'Ła', 'łb' ].sort(caseInsensitiveComparator); // ["Ła", "łb", "łc"]
```

#### `caseSensitiveComparator(a, b)`
Useful when you want to sort an `Array` of `String`. Just pass the reference as an argument to `Array.prototype.sort`.
```javascript
import { caseSensitiveComparator } from 'polish-sort';

[ 'łc', 'Ła', 'łb' ].sort(caseSensitiveComparator); // ["łb", "łc", "Ła"]
```

#### `createComparator(options)`
Useful when you want to sort an `Array` of `Object` by some attribute. Returns a comparator. Accepts 1 optional argument of type `Object` with the following (both optional) attributes:
- `getter` - `Function` - defaults to: `(a) => a`
- `ignoreCase` - `Boolean` - defaults to: `false`

```javascript
import { createComparator } from 'polish-sort';

const comparator = createComparator({
  getter: (value) => value.name,
  ignoreCase: true
});

[
  { name: 'la', age: 1 },
  { name: 'łb', age: 2 },
  { name: 'lc', age: 3 }
].sort(comparator);
// [
//   { name: "la", age: 1 },
//   { name: "lc", age: 3 },
//   { name: "łb", age: 2 }
// ]
```
