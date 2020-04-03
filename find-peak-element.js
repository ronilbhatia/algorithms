/**
 * @param {number[]} nums
 * @return {number}
 */
// var findPeakElement = function (nums, max = -Infinity, maxIndex = null) {
//   let mid = Math.floor(nums.length / 2);
//   let midNum = nums[mid];
//   let left = nums[mid-1] || -Infinity;
//   let right = nums[mid+1] || -Infinity;

//   if (midNum > left && midNum > right) return midNum;
//   if (max > left && max > right) {

//   }
// };

var findPeakElement = function(nums, start = 0, end = nums.length) {
  let mid = Math.floor((start + end) / 2);
  let midNum = nums[mid];
  let left = nums[mid-1] || -Infinity;
  let right = nums[mid+1] || -Infinity;

  if (midNum > left && midNum > right) return mid;
  if (right > midNum) {
    return findPeakElement(nums, mid + 1, end);
  } else {
    return findPeakElement(nums, start, mid - 1);
  }
}