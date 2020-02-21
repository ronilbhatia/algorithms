/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSubtree = function (s, t) {
  let queue = [s];

  while (queue.length) {
    let curr = queue.shift();
    if (isSameTree(curr, t)) return true;
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }

  return false;
};

function isSameTree(t1, t2) {
  if (!t1 && !t2) return true;
  if (!t1 || !t2) return false;
  if (t1.val !== t2.val) return false;

  return (isSameTree(t1.left, t2.left) && isSameTree(t1.right, t2.right));
}