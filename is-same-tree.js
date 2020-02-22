/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  // Base Cases: 
  // 1. If they're both null it means we've made it to a matching leaf successfully
  // 2. If one of them is null (we know they're not **both** null at this point) 
  //    they're not the same.
  // 3. If their values don't match up they're not the same
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;

  // Inductive Step:
  // Get result from left child and result from right child. If either are false,
  // return false
  let leftRes = isSameTree(p.left, q.left);
  let rightRes = isSameTree(p.right, q.right);

  return (leftRes && rightRes)
}