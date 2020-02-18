// BFS
var findSecondMinimumValue = function(root) {
    let queue = [root];
    let min = root.val;
    let secondMin = Infinity;

    while (queue.length) {
        let curr = queue.shift();
        if (curr.val !== min && (curr.val < secondMin)) secondMin = curr.val;
        if (!curr.left) continue;

        if (curr.left.val < secondMin) queue.push(curr.left)
        if (curr.right.val < secondMin) queue.push(curr.right)
    }

    return secondMin === Infinity ? -1 : secondMin;
};

// DFS
var findSecondMinimumValue = function(root) {
  let min = root.val;
  return findSecondMin(root, min, Infinity);
}

function findSecondMin(node, min, secondMin) {
  if (!node) return -1;
  if (node.val !== min && node.val < secondMin) return node.val;

  let leftMin = findSecondMin(node.left, min, secondMin);
  let rightMin = findSecondMin(node.right, min, secondMin);

  if (leftMin === -1) return rightMin;
  if (rightMin === -1) return leftMin;
  return Math.min(leftMin, rightMin);
}