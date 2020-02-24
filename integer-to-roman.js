/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const values = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000]
  const numerals = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M'];
  let roman = '';
  let idx = values.length - 1;

  while (num > 0) {
    let increment = values[idx];
    if (increment > num) {
      idx--;
    } else {
      num -= increment;
      roman += numerals[idx];
    }
  }

  return roman;
};

