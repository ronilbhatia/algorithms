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
var findFrequentTreeSum = function (root) {
  if (!root) return [];
  let subsumTree = buildSubsumTree(root);
  return findMode(subsumTree);
};

var buildSubsumTree = function (root) {
  if (!root) return null;

  let left = buildSubsumTree(root.left);
  let right = buildSubsumTree(root.right);
  let subSum = root.val;
  if (left) subSum += left.val;
  if (right) subSum += right.val;

  let tree = new TreeNode(subSum);
  tree.left = left;
  tree.right = right;

  return tree;
}

var findMode = function (root) {
  let counts = {};
  let queue = [root];

  while (queue.length) {
    let curr = queue.shift();
    counts[curr.val] = (counts[curr.val] === undefined) ? 1 : counts[curr.val] + 1;
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }

  let keys = Object.keys(counts);
  let max = keys.reduce((max, key) => counts[key] > max ? counts[key] : max, 0);

  return keys.filter(key => counts[key] === max);
};