/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function (root) {
  let vals = inorderTraverse(root);
  let min = 2147483647;

  for (let i = 1; i < vals.length; i++) {
    let diff = vals[i] - vals[i - 1];
    if (diff < min) min = diff;
  }

  return min;
};

function inorderTraverse(root, vals = []) {
  if (!root) return vals;

  inorderTraverse(root.left, vals);
  vals.push(root.val);
  inorderTraverse(root.right, vals);

  return vals;
}