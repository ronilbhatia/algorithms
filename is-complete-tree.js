/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isCompleteTree = function (root) {
  let queue = [root];
  let hitNull = false;
  while (queue.length) {
    let curr = queue.shift();
    if (!curr) {
      hitNull = true;
      continue;
    } else if (hitNull) return false;

    queue.push(curr.left);
    queue.push(curr.right);
  }

  return true;
};