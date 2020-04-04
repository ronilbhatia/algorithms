/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  if (nums.length === 0) return [];

  let max = nums[0];
  let curr = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (curr < 0) curr = 0;
    curr += nums[i];

    if (curr > max) max = curr;
  }

  return max;
};