/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function(nums) {
  if (!nums.length) return 0;
  let counts = [0, 0];
  nums.forEach(el => counts[el] += 1);
  let maxWindowSize = Math.min(...counts) * 2; 

  let longest = 0;
  let start = 0;
  let end = 0;
  let currCounts = [0, 0];

  while (end < nums.length) {
    if ((end - start) > maxWindowSize) {
      currCounts[nums[start]]--;
      start++;
    }
    currCounts[nums[end]]++;
    let curr = Math.min(...currCounts) * 2;
    if (curr > longest) longest = curr;

    end++;
  }

  return longest;
};

var findMaxLength = function (nums) {
  let diffHash = {};
  let counts = [0, 0]
  let longest = 0;

  for (let i = 0; i < nums.length; i++) {
    counts[nums[i]]++;
    let diff = counts[0] - counts[1];
    if (!diffHash.hasOwnProperty(diff)) {
      diffHash[diff] = i;
    } {
      let curr = i - diffHash[diff];
      if (curr > longest) longest = curr;
    }
  }

  return longest;
}

// [0,0,0,0,1,1,1,1]
// [0, 1, 1, 0]
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, ]
// 