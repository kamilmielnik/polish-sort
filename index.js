const ALPHABET = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż';
const LETTERS = ALPHABET.split('').map((letter) => `${letter}${letter.toUpperCase()}`).join('');
const DIGITS = '01234567989';
const SPECIAL_CHARACTERS = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`}|{~'; // ASCII order
const CHARACTERS = `${SPECIAL_CHARACTERS}${DIGITS}${LETTERS}`;
const identity = (a) => a;

const createComparator = ({ getter = identity, ignoreCase = false } = {}) => (a, b) => {
  let aValue = getter(a) || '';
  let bValue = getter(b) || '';
  if (ignoreCase) {
    aValue = aValue.toLowerCase();
    bValue = bValue.toLowerCase();
  }
  const aLength = aValue.length;
  const bLength = bValue.length;
  const maxIndexToCheck = Math.min(aLength, bLength);
  let index = 0;
  while(index < maxIndexToCheck && aValue[index] === bValue[index]) {
    index++;
  }
  index = Math.min(index, maxIndexToCheck);
  const aLastValue = CHARACTERS.indexOf(aValue[index]);
  const bLastValue = CHARACTERS.indexOf(bValue[index]);
  if (aLastValue < bLastValue) {
    return -1;
  }
  if (aLastValue > bLastValue) {
    return 1;
  }
  return bLength - aLength;
};

const caseInsensitiveComparator = createComparator({ ignoreCase: true });
const caseSensitiveComparator = createComparator();

module.exports = {
  caseInsensitiveComparator,
  caseSensitiveComparator,
  createComparator
};
