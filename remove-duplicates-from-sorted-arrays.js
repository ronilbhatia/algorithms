var removeDuplicates = function (nums) {
  // let totalSwapped = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      let start = i + 1; // start is inclusive of extra elements
      let end = start; // end is exclusive of extra elements
      while (nums[end] === nums[end - 1]) end++;
      shiftElements(nums, start, end);
    }
  }

  return nums;
};

function shiftElements(nums, start, end) {
  // start = 4, end = 6
  let numToSwap = end - start;
  let next = end;
  while (start < end && next < nums.length) {
    [nums[next], nums[start]] = [nums[start], nums[next]];
    start++;
    next++;
  }

  if (numToSwap + end < nums.length) shiftElements(nums, end, end + numToSwap)
  // if (numToSwap + end < nums.length) numToSwap += shiftElements(nums, end, end + numToSwap)
  // return numToSwap;
}