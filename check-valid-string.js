/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
  let left = 0;
  let right = 0;
  let wild = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === ')') {
      right += 1;
    } else if (s[i] === '(') {
      left += 1;
    } else {
      wild += 1;
    }

    if (right > (left + wild)) return false;
  }

  left = 0;
  right = 0;
  wild = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ')') {
      right += 1;
    } else if (s[i] === '(') {
      left += 1;
    } else {
      wild += 1;
    }

    if (left > (right + wild)) return false;
  }

  return true;
};