/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  const seenNums = new Set();

  while (n !== 1) {
    if (seenNums.has(n)) return false;
    seenNums.add(n);
    let digits = getDigits(n);
    n = digits.reduce((product, num) => product * num)
  }

  return true;
};

function getDigits(n) {
  let digits = [];

  while (n > 0) {
    digits.push(n % 10);
    n = Math.floor(n / 10);
  }

  return digits;
}