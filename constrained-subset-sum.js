/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var constrainedSubsetSum = function (nums, k) {
  let best;
  let curr = 0;
  let negNumCount = 0;
  let negNums = [];

  for (let i = 0; i < nums.length; i++) {
    curr += nums[i];

    if (nums[i] > 0) {
      if (negNumCount >= k) {
        let negSum = optimalNegSum(negNums, k);
        curr = (curr + negSum > nums[i]) ? curr + negSum : nums[i];
      }

      negNums = [];
      negNumCount = 0;
    }

    if (best === undefined || curr > best) best = curr;

    if (nums[i] < 0) {
      negNumCount++;
      curr -= nums[i];
      negNums.push(nums[i]);
    }
  }

  return best;
};

function optimalNegSum(negNums, k) {
  if (negNums.length < k) return 0;
  let best = -Infinity;

  for (let i = 0; i < k; i++) {
    let curr = negNums[i] + optimalNegSum(negNums.slice(i + 1), k);
    if (curr > best) best = curr;
  }
  
  return best;
}