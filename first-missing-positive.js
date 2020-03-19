/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  let arr = new Array(nums.length);

  nums.forEach(num => {
    if (num > 0 && num < nums.length) arr[num] = true;
  });

  for (let i = 1; i < arr.length; i++) {
    if (!arr[i]) return i;
  }
};