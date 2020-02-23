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
 * @return {TreeNode}
 */
var inorderSuccessor = function(root, p, closestRightParent = null) {
    if (root.val === p.val) return nextInorder(root, closestRightParent);
    if (p.val > root.val) return inorderSuccessor(root.right, p, closestRightParent);
    return inorderSuccessor(root.left, p, root);
};

function nextInorder(root, closestRightParent) {
    if (!root.right) return closestRightParent;
    
    let right = root.right;
    while (right.left) right = right.left;
    
    return right;
}