/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let prefix = [];
  let product = 1;
  nums.forEach(num => {
    product *= num;
    prefix.push(product)
  })

  let suffix = [];
  product = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    product *= nums[i];
    suffix.push(product);
  }

  return nums.map((num, idx) => (prefix[idx - 1] === undefined ? 1 : prefix[idx - 1]) * (suffix[suffix.length - 2 - idx] === undefined ? 1 : suffix[suffix.length - 2 - idx]))
};