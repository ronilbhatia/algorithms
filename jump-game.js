/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums, start = 0, memo = {}) {
  if (start === nums.length - 1) return true;
  let dist = nums[start];

  for (let i = dist; i > 0; i--) {
    if (memo.hasOwnProperty(start + i)) continue;
    let res = canJump(nums, start + i, memo);
    memo[start + i] = res;
    if (res) return res;
  }

  return false;
};