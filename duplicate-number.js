/**
 * @param {number[]} nums
 * @return {number}
 */

var findDuplicate = function (nums, min = 1, max = nums.length - 1) {
  if (min === max) return min;
  let average = (min + max) / 2;

  let lessThanCount = 0;
  let greaterThanCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= min && nums[i] <= max) {
      if (nums[i] < average) lessThanCount++;
      if (nums[i] > average) greaterThanCount++;
    }
  }

  if (lessThanCount > greaterThanCount) return findDuplicate(nums, min, Math.floor(average));
  return findDuplicate(nums, Math.ceil(average), max);
};