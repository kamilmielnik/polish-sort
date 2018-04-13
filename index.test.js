const {
  createComparator,
  caseSensitiveComparator,
  caseInsensitiveComparator
} = require('./index');

test('createComparator', () => {
  const cases = [
    {
      input: [
        { name: 'la' },
        { name: 'łb' },
        { name: 'lc' }
      ],
      expected: [
        { name: 'la' },
        { name: 'lc' },
        { name: 'łb' }
      ]
    }
  ];

  cases.forEach(({ input, expected }) => {
    const comparator = createComparator({ getter: (value) => value.name });
    const sorted = input.sort(comparator);
    expect(sorted).toEqual(expected);
  });
});

test('caseSensitiveComparator', () => {
  const cases = [
    {
      input: [ 'z', 'ł', 'a', 'Z', 'Ł', 'A' ],
      expected: [ 'a', 'A', 'ł', 'Ł', 'z', 'Z' ]
    },
    {
      input: [ 'łc', 'Ła', 'łb' ],
      expected: [ 'łb', 'łc', 'Ła' ]
    },
    {
      input: [ 'aaa', 'aaa' ],
      expected: [ 'aaa', 'aaa' ]
    }
  ];

  cases.forEach(({ input, expected }) => {
    const sorted = input.sort(caseSensitiveComparator);
    expect(sorted).toEqual(expected);
  });
});

test('caseInsensitiveComparator', () => {
  const cases = [
    {
      input: [ 'łc', 'Ła', 'łb' ],
      expected: [ 'Ła', 'łb', 'łc' ]
    }
  ];

  cases.forEach(({ input, expected }) => {
    const sorted = input.sort(caseInsensitiveComparator);
    expect(sorted).toEqual(expected);
  });
});

test('falsy values', () => {
  const validString = 'aaa';
  const input = [ validString, null, undefined, NaN, 0, false ];
  const sorted = input.sort(caseSensitiveComparator);
  const last = sorted[sorted.length - 1];
  const secondToLast = sorted[sorted.length - 2];
  expect(secondToLast).toBe(validString);
  expect(last).toBe(undefined);
  /* http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
   * Because non-existent property values always compare greater than undefined
   * property values, and undefined always compares greater than any other
   * value, undefined property values always sort to the end of the result,
   * followed by non-existent property values. */
});
