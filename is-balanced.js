var isBalanced = function (root) {
  return findHeight(root)[1];
};

var findHeight = function (node) {
  if (!node) return [0, true];

  let leftHeight = findHeight(node.left);
  // If we already know the left is false, we shouldn't check the right
  if (!leftHeight[1]) return [null, false];

  let rightHeight = findHeight(node.right);
  if (!rightHeight[1]) return [null, false];

  // If the discrepancy in height is more than 1, return false
  if (Math.abs(leftHeight[0] - rightHeight[0]) > 1) return [null, false];

  return [Math.max(leftHeight[0], rightHeight[0]) + 1, true];
}