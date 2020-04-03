/**
 * @param {number[]} nums
 * @return {number}
 */
// O(n) runtime, O(1) space
var singleNumber = function (nums) {
  return nums.reduce((res, num) => res ^ num);
};

// O(n) runtime, O(n) space
var singleNumber = function (nums) {
  let counts = {};

  nums.forEach(num => {
    if (!counts.hasOwnProperty(num)) counts[num] = 0;
    counts[num]++;
  });


  for (let i = 0; i < nums.length; i++) {
    if (counts[nums[i]] === 1) return nums[i];
  }
};