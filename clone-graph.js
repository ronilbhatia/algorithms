/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */
/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node, memo = {}) {
  if (!node) return null;

  let root = new Node(node.val);
  memo[node.val] = root;

  for (let i = 0; i < node.neighbors.length; i++) {
    let neighbor = node.neighbors[i];
    if (memo.hasOwnProperty(neighbor.val)) {
      root.neighbors.push(memo[neighbor.val]);
    } else {
      root.neighbors.push(cloneGraph(neighbor, memo))
    }
  }

  return root;
};
