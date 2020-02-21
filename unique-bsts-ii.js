/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 *  
 *  1        2
 *   \      /
 *    2    1 
 * 
 *     3         3      1       1             2
 *    /         /        \       \           / \
 *   1         2          3       2         1   3
 *    \      /           /         \ 
 *     2    1           2           3
 */
var generateTrees = function (n) {
  if (n === 0) return [];
  if (n === 1) return [new TreeNode(1)];

  // Get previous trees as starting point to build out current trees;
  let prev = generateTrees(n - 1);
  let trees = [];

  for (let i = 0; i < prev.length; i++) {
    let tree = prev[i];

    // Create tree with `n` as root. Since `n` is always the biggest # the copy
    // of the subtree will always go on the left
    let newTree = new TreeNode(n);
    let copy = copyTree(tree);
    newTree.left = copy;
    trees.push(newTree);

    let next = tree
    while (next) {
      // We need to hold a reference to the root of our copy to push into result array
      let root = copyTree(tree);

      // Find the node to insert `n` into in our new copy of the tree
      let insertNode = root;
      while (next.val !== insertNode.val) insertNode = insertNode.right;

      // Detach current right child from this node, place n, here, and place
      // old right on `n`s left. N is the biggest # in the tree so this will
      // always be the insertion pattern.
      let oldRight = insertNode.right;
      insertNode.right = new TreeNode(n);
      insertNode.right.left = oldRight;
      next = oldRight;

      trees.push(root);
    }
  }

  return trees;
};

copyTree = function (root) {
  if (!root) return null;

  let rootCopy = new TreeNode(root.val);
  rootCopy.left = copyTree(root.left);
  rootCopy.right = copyTree(root.right);

  return rootCopy;
}