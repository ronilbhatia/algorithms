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
var isSymmetric = function(root) {
  if (!root) return true;

  let nodes = inorder(root, [])
  let mid = Math.floor(nodes.length / 2);
  if (root !== nodes[mid]) return false;
  let right = mid + 1;
  let left = mid - 1;

  while (left >= 0) {
    if (!nodes[left] && !nodes[right]) {
      left--;
      right++;
      continue;
    } else if (!nodes[left] || !nodes[right]) {
      return false;
    } else if (nodes[left].val !== nodes[right].val) return false;
    left--;
    right++;
  }

  return true;
}

function inorder (root, nodes) {
  if (!root.left && !root.right) {
    nodes.push(root);
    return nodes;
  }

  root.left ? inorder(root.left, nodes) : nodes.push(null);
  nodes.push(root)
  root.right ? inorder(root.right, nodes) : nodes.push(null);

  return nodes;
}

// var isSymmetric = function (root) {
//   if (!root) return true;

//   let layer = [root.left, root.right];

//   while (!layer.every(node => !node)) {
//     let right = layer.length / 2;
//     let left = right - 1;

//     while (left >= 0) {
//       if (!layer[left] && !layer[right]) {
//         left--;
//         right++;
//         continue;
//       } else if (!layer[left] || !layer[right]) {
//         return false;
//       } else if (layer[left].val !== layer[right].val) return false;
//       left--;
//       right++;
//     }

//     let nextLayer = [];
//     layer.forEach(node => {
//       if (!node) {
//         nextLayer.push(null, null);
//       } else {
//         nextLayer.push(node.left, node.right);
//       }
//     });

//     layer = nextLayer;
//   }

//   return true;
// };