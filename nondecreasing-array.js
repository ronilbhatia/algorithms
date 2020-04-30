/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function (nums) {
  let switched = false;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      if (switched) return false;
      switched = true;
      
      if (nums[i - 2] !== undefined && nums[i] < nums[i - 2]) {
        nums[i] = nums[i - 1];
      } else {
        nums[i - 1] = nums[i];
      }
    }
  }

  return true;
};