/**
 * @param {number[]} arr
 * @return {number}
 */
var countElements = function (arr) {
  arr.sort((a, b) => a - b);
  let res = 0;
  let currNumCount = 1;

  for (let i = 1; i < arr.length; i++) {
    let prev = arr[i-1]
    if (prev + 1 === arr[i]) {
      res += currNumCount;
      currNumCount = 1;
    } else if (prev === arr[i]) {
      currNumCount++;
    } else {
      currNumCount = 1;
    }
  }

  return res;
};