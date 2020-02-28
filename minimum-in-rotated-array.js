/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums, start = 0, end = nums.length) {
  if (start === end - 1) return nums[start];

  let midIdx = Math.floor((start + end) / 2);
  let mid = nums[midIdx];
  let first = nums[start];
  let last = nums[end - 1];

  if (mid === last) return (last < first) ? last : first;

  if (mid > first && first > last) return findMin(nums, mid, end);
  return findMin(nums, start, mid + 1);
};

var findMin = function (nums, start = 0, end = nums.length) {
  if (start === end - 1) return nums[start];

  let midIdx = Math.floor((start + end) / 2);
  let mid = nums[midIdx];
  let first = nums[start];
  let last = nums[end - 1];

  if (mid === last) return (last < first) ? last : first;

  if (mid > first && first > last) return findMin(nums, midIdx + 1, end);
  if (mid < first && mid < nums[midIdx - 1]) return findMin(nums, midIdx, end);
  return findMin(nums, start, midIdx + 1);
};