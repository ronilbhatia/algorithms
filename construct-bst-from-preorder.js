/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function (preorder) {
  if (!preorder.length) return null;
  let root = new TreeNode(preorder.shift());

  if (preorder[0] <= root.val) root.left = bstFromPreorder(preorder);
};