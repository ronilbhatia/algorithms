/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  let hash = {}
  let stack = [nums2[0]];

  for (let i = 1; i < nums2.length; i++) {
    let num = nums2[i];
    while (num > stack[stack.length - 1]) {
      let curr = stack.pop();
      hash[curr] = num;
    }
    stack.push(num);
  }

  while (stack.length) {
    let num = stack.pop();
    hash[num] = -1;
  }

  return nums1.map(num => hash[num]);
};