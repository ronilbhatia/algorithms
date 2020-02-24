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
var sumEvenGrandparent = function (root, parent = null, grandparent = null) {
  if (!root) return 0;

  let sum = sumEvenGrandparent(root.left, root, parent) + sumEvenGrandparent(root.right, root, parent);
  if (grandparent && grandparent.val % 2 === 0) sum += root.val;

  return sum;
};