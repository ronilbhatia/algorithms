/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST = function (root) {
  if (!root) return root;

  var _increasingBST = function (root) {
    if (!root.left && !root.right) return [root, root];

    let newRoot, newRight, last;

    if (root.left) {
      [newRoot, last] = _increasingBST(root.left);
      last.right = root;
      root.left = null;
      last = root;
    }

    if (root.right) {
      [newRight, last] = _increasingBST(root.right);
      root.right = newRight;
    }

    return newRoot ? [newRoot, last] : [root, last];
  };

  let [newRoot, last] = _increasingBST(root);
  return newRoot;
}
