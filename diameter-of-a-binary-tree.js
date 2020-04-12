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
var diameterOfBinaryTree = function (root) {
  return _diameterOfBinaryTree(root)[0];
};

// Helper function to return tuple of biggest diameter, and depth of this node
function _diameterOfBinaryTree(node) {
  if (!node) return [0, -1];

  let [leftDiam, leftDepth] = _diameterOfBinaryTree(node.left);
  let [rightDiam, rightDepth] = _diameterOfBinaryTree(node.right);

  let currDiam = 2 + leftDepth + rightDepth;
  let bestDiam = Math.max(leftDiam, rightDiam, currDiam);
  let depth = Math.max(leftDepth, rightDepth) + 1;

  return [bestDiam, depth];
}