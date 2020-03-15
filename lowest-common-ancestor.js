/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  let pAncestors = findAncestors(root, p);
  let qAncestors = findAncestors(root, q);

  for (let i = 0; i < pAncestors.length; i++) {
    let ancestor = pAncestors[i];
    if (qAncestors.includes(ancestor)) return ancestor;
  }
};

function findAncestors(root, node) {
  if (root === null) return false;
  if (root === node) return [node];

  let left = findAncestors(root.left, node);
  if (left) {
    left.push(root);
    return left;
  };
  
  let right = findAncestors(root.right, node);
  if (right) {
    right.push(root);
    return right;
  };
}