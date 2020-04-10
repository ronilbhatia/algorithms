/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function (S, T) {
  let p1 = S.length - 1;
  let p2 = T.length - 1;
  let nextS, nextT;

  while (p1 >= 0 && p2 >= 0) {
    [nextS, p1] = findNextLetter(S, p1);
    [nextT, p2] = findNextLetter(T, p2);

    if (nextS !== nextT) return false;
  }

  return true;
};

function findNextLetter(string, pointer) {
  let numBackspaces = 0;
  while (pointer >= 0) {
    let char = string[pointer];
    if (char === '#') {
      numBackspaces++;
    } else if (numBackspaces === 0) {
      return [char, pointer - 1]
    } else {
      numBackspaces--;
    }

    pointer--;
  }

  return [null, -1];
}