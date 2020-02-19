/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  if (!root) return [];
  let result = [];

  // BFS since we need to do level traversal
  // Item in queue will be node and curr level we are on
  let queue = [[root, 1]];
  let currLevel = 1;
  let currSum = 0;
  let currCount = 0;

  // Optimize to use pointer so we don't need to shift off queue  
  let start = 0;

  while (start < queue.length) {
    let [node, level] = queue[start];
    if (level === currLevel) {
      currSum += node.val;
      currCount++;
    } else {
      result.push(currSum / currCount);
      currLevel++;
      currSum = node.val;
      currCount = 1;
    }

    if (node.left) queue.push([node.left, level + 1]);
    if (node.right) queue.push([node.right, level + 1]);
    start++;
  }

  result.push(currSum / currCount);
  return result;
};