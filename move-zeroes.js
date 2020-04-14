/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// Version B - Keep zero pointer, and numPointer. Swap with each other then find
// next respective zero & non-zero. O(n) - each pointer iterates through the 
// array once
var moveZeroes = function (nums) {
  let start = 0;
  while (start < nums.length && nums[start] !== 0) start++;

  let zeroPointer = start;
  let numPointer = start + 1;
  while (numPointer < nums.length && nums[numPointer] === 0) numPointer++;

  while (numPointer < nums.length) {
    [nums[zeroPointer], nums[numPointer]] = [nums[numPointer], nums[zeroPointer]];
    zeroPointer++;
    while (nums[zeroPointer] !== 0) zeroPointer++;
    numPointer++;
    while (numPointer < nums.length && nums[numPointer] === 0) numPointer++;
  }

  return nums;
}

// Version A - stop at 0, find next non-zero number and swap, O(n^2) worst case
// var moveZeroes = function (nums) {
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) continue;
//     let next = i + 1;
//     while (nums[next] === 0) next++;
//     [nums[i], nums[next]] = [nums[next], nums[i]];
//   }

//   return nums;
// };