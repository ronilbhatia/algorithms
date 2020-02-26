/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target, start = 0, end = nums.length) {
  if (start === end) return -1;

  let first = nums[start];
  let midIdx = Math.floor((start + end) / 2);
  let mid = nums[midIdx];

  if (target === mid) return midIdx;

  if ((first <= target && target < mid) || ((target < mid || first <= target) && first > mid)) {
    return search(nums, target, start, midIdx);
  }
  
  return search(nums, target, midIdx + 1, end);
}

// var search = function (nums, target, start = 0, end = nums.length) {
//   if (start === end) return -1;

//   let first = nums[start];
//   let last = nums[end - 1];
//   let mid = Math.floor((start + end) / 2);

//   if (last >= first) {
//     if (nums[mid] === target) return mid;
//     if (nums[mid] < target) return search(nums, target, mid + 1, end);
//     return search(nums, target, start, mid);
//   } else {
//     if (target > last && target < first) return -1;

//     if (target === nums[mid]) return mid;
//     if (target === nums[start]) return start;
//     if (target === nums[end]) return end - 1;
    
//     if (nums[mid] > nums[end-1] && (target > nums[mid] || target <= nums[end - 1])) return search(nums, target, mid + 1, end)
//     if (nums[mid] < nums[end - 1] && target > nums[mid] && target < nums[end - 1]) return search(nums, target, mid + 1, end)
//     return search(nums, target, start, mid);
//   }
// };