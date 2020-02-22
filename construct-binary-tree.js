/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 * 
 * Example:
 * preorder = [3,9,12,4,20,15,7] // start = 0, end = 7 i = 3, rightIdx = 4
 * inorder = [12,9,4,3,15,20,7]
 * 
 *          3
 *        /   \
 *      9     20
 *     / \   /  \
 *   12   4 15   7
 **/
// Optimized
var buildTree = function (preorder, inorder, rootIdx = 0, start = 0, end = preorder.length) {
  if (start === end) return null;

  let root = preorder[rootIdx];

  let i = start;
  while (root !== inorder[i]) i++;

  let rootNode = new TreeNode(root);
  let rightIdx = i + 1;

  rootNode.left = buildTree(preorder, inorder, rootIdx+1, start, i);
  rootNode.right = buildTree(preorder, inorder, rootIdx + rightIdx - start, rightIdx, end);
  return rootNode;
};

// Unoptimized
var buildTree = function (preorder, inorder) {
  if (preorder.length === 1) return null;
  
  let root = preorder[0];

  let i = 0;
  while (root !== inorder[i]) i++;

  let rootNode = new TreeNode(root);
  let rightIdx = i + 1;
  
  rootNode.left = buildTree(preorder.slice(1, rightIdx), inorder.slice(0, i));
  rootNode.right = buildTree(preorder.slice(rightIdx), inorder.slice(rightIdx));
  return rootNode;
};

var preorder = function(node) {
  console.log(node.val);
  if (node.left) preorder(node.left);
  if (node.right) preorder(node.right);
}

var inorder = function(node) {
  if (node.left) inorder(node.left);
  console.log(node.val);
  if (node.right) inorder(node.rght);
}