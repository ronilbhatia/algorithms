/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

 // Constant space but wow I hate this
class FindMode {
  constructor(root) {
    this.root = root;
    this.currVal = null;
    this.currCount = 0;
    this.bestCount = 0;
    this.modes = [];
    this.findMaxCount(this.root);
    this.currCount = 0;
    this.findModes(this.root);
  }

  findModes(node) {
    if (!node) return;

    this.findModes(node.left);
    this.updateCurrCount(node);
    this.findModes(node.right);
  }

  findMaxCount(node) {
    if (!node) return;

    this.findMaxCount(node.left);
    this.updateMaxCount(node);
    this.findMaxCount(node.right);
  }

  updateCurrCount(node) {
    if (node.val !== this.currVal) {
      this.currCount = 0;
      this.currVal = node.val;
    }
    this.currCount++;
    console.log(this.currCount);
    if (this.currCount === this.bestCount) this.modes.push(node.val);
  }

  updateMaxCount(node) {
    if (node.val !== this.currVal) {
      this.currCount = 0;
      this.currVal = node.val;
    }
    this.currCount++;
    if (this.currCount > this.bestCount) this.bestCount = this.currCount;
  }
}
// O(1) space forreal
var findMode = function (root) {
  let modeFinder = new FindMode(root);
  return modeFinder.modes;
}

var findMaxCount = function(node, bestCount = 0, currCount = 0, currVal = null) {
  if (!node) return 0;
  let bestCount = findMaxCount(node.left, bestCount, currCount, currVal);
  if (currVal !== node.val) {
    currVal = node.val;
    currCount = 0;
  }
  currCount++;
  if (currCount > bestCount) bestCount = currCount;
  findMaxCount(node.right, bestCount, currCount, currVal);
}
 
function updateMaxCount(node, bestCount, currCount, currVal) {
  if (node.val !== currVal) {
    currCount = 0;
    currVal = node.val;
  }
}

// O(1) space, not really
// var findMode = function(root) {
//   return dfs(root)[0];
// }

// var dfs = function(node) {
//   if (!node) return [[], 0, 0]; // modes, max_count, self_count

//   let leftRes = dfs(node.left);
//   let rightRes = dfs(node.right);

//   let selfCount = 1
//   selfCount += count(node.left, node.val);
//   selfCount += count(node.right, node.val);

//   if (selfCount > leftRes[1] && selfCount > rightRes[1]) return [[node.val], selfCount];
//   if (selfCount === leftRes[1] && selfCount === rightRes[1]) return [[node.val].concat(leftRes[0]).concat(rightRes[0]), selfCount];
//   if (leftRes[1] > rightRes[1]) {
//     if (selfCount > leftRes[1]) return [[node.val], selfCount];
//     if (leftRes[1] === selfCount) return [[node.val].concat(leftRes[0]), selfCount];
//     return leftRes;
//   } else if (rightRes[1] > leftRes[1]) {
//     if (selfCount > rightRes[1]) return [[node.val], selfCount];
//     if (rightRes[1] === selfCount) return [[node.val].concat(rightRes[0]), selfCount];
//     return rightRes;
//   } else {
//     return [leftRes[0].concat(rightRes[0]), leftRes[1]];
//   }
// }

// var count = function(node, val) {
//   if (!node) return 0;

//   let leftRes = count(node.left, val);
//   let rightRes = count(node.right, val);

//   let total = leftRes + rightRes;
//   if (node.val === val) total++;
//   return total;
// }

// // O(n) space
// var findMode = function (root) {
//   let counts = {};
//   let queue = [root];

//   while (queue.length) {
//     let curr = queue.shift();
//     counts[curr.val] = (counts[curr.val] === undefined) ? 1 : counts[curr.val] + 1;
//     if (curr.left) queue.push(curr.left);
//     if (curr.right) queue.push(curr.right);
//   }

//   let keys = Object.keys(counts);
//   let max = keys.reduce((max, key) => counts[key] > max ? counts[key] : max, 0);
  
//   return keys.filter(key => counts[key] === max);
// };