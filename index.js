const ALPHABET = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż';
const LETTERS = ALPHABET.split('').map((letter) => `${letter}${letter.toUpperCase()}`).join('');
const DIGITS = '01234567989';
const SPECIAL_CHARACTERS = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`}|{~';
const CHARACTERS = `${SPECIAL_CHARACTERS}${DIGITS}${LETTERS}`;
const identity = (a) => a;

const createComparator = ({ getter = identity, ignoreCase = false } = {}) => (a, b) => {
  let aRaw = getter(a) || '';
  let bRaw = getter(b) || '';
  if (ignoreCase) {
    aRaw = aRaw.toLowerCase();
    bRaw = bRaw.toLowerCase();
  }
  const max = Math.min(aRaw.length, bRaw.length);
  let index = 0;
  while(index < max && aRaw[index] === bRaw[index]) {
    index++;
  }
  index = Math.min(index, max);
  const aLastValue = CHARACTERS.indexOf(aRaw[index]);
  const bLastValue = CHARACTERS.indexOf(bRaw[index]);
  if (aLastValue < bLastValue) {
    return -1;
  }
  if (aLastValue > bLastValue) {
    return 1;
  }
  return bRaw.length - aRaw.length;
};

const caseInsensitiveComparator = createComparator({ ignoreCase: true });
const caseSensitiveComparator = createComparator();

module.exports = {
  caseInsensitiveComparator,
  caseSensitiveComparator,
  createComparator
};
