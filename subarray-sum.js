/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

// Optimized - O(n)
var subarraySum = function(nums, k) {
  let prefix = { 0 : 0 };
  let currSum = 0;
  let total = 0;

  for (let i = 0; i < nums.length; i++) {
    currSum += nums[i];
    if (prefix.hasOwnProperty(currSum - k)) total += prefix[currSum - k];
    
    if (!prefix.hasOwnProperty(currSum)) prefix[currSum] = 0;
    prefix[currSum]++;
  }

  return total;
}
 
// Naive Approach - O(n^2)
var subarraySum = function (nums, k) {
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    let currSum = 0;

    for (let j = i; j < nums.length; j++) {
      currSum += nums[j];
      if (currSum === k) count++;
    }
  }

  return count;
};