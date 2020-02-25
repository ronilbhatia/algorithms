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
var sumOfLeftLeaves = function (root, left = false) {
  if (left === true && isLeaf(root)) return root.val;
  return sumOfLeftLeaves(root.left, true) + sumOfLeftLeaves(root.right, false);
};

function isLeaf(node) {
  return !root.left && !root.right;
}