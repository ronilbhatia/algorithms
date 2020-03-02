// 1
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function (nums) {
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    const num = array[i];
    let numSmaller = 0;
    for (let j = 0; j < nums.length; j++) {
      if (i === j) continue;
      if (nums[j] < num) numSmaller++;
    }
    result.push(numSmaller);
  }

  return result;
};

// 2
/**
 * @param {string[]} votes
 * @return {string}
 */
function rankTeams(votes) {
  let votesHash = {};
  let numChoices = votes[0].length;
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  alphabet.forEach(letter => votesHash[letter] = new Array(numChoices).fill(0))

  votes.forEach(vote => {
    for (let i = 0; i < vote.length; i++) {
      let letter = vote[i];
      votesHash[letter][i]++;
    }
  });

  let res = ''
  for (let i = 0; i < numChoices; i++) {
    let choices = Object.keys(votesHash);
    let bestLetters = [];
    let tie = true;
    let j = 0;

    while (j < numChoices && tie) {
      let best;
      choices.forEach(choice => {
        if (best === undefined || votesHash[choice][j] > best) {
          tie = false;
          best = votesHash[choice][j];
          bestLetters = [choice];
        } else if (votesHash[choice][j] === best) {
          tie = true;
          bestLetters.push(choice);
        }
      });
      choices = bestLetters;
      j++;
    }

    res += bestLetters[0];
    delete votesHash[bestLetters[0]];
  }

  return res;
};

// 3
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSubPath = function (head, root) {
  if (!head) return true;
  if (!root) return false;

  let queue = [root];

  while (queue.length) {
    let curr = queue.shift();
    if (curr.val === head.val) {
      let res = helper(curr, head);
      if (res) return res;
    }

    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }

  return false;
};

function helper(root, head) {
  if (!head) return true;
  if (!root) return false;
  if (root.val !== head.val) return false;
  return helper(root.left, head.next) || helper(root.right, head.next);
}

// 4
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minCost = function (grid) {
  let minCostFinder = new MinCost(grid);
  if (minCostFinder.valid) return 0;
  return 1;
};

class MinCost {
  constructor(grid) {
    this.grid = grid;
    this.dp = new Array(grid.length).fill(0).map(() => new Array(grid[0].length).fill(null));
    this.valid = this.hasValidPath();
    this.tabulate();
  }

  hasValidPath() {
    this.freePositions = new Set();
    let currPos = [0,0];
    
    while (this.validPos(currPos) && !this.freePositions.has(currPos.toString())) {
      this.freePositions.add(currPos.toString());
      let [x, y] = currPos;
      this.dp[x][y] = 0;
      if (x === this.grid.length - 1 && y === this.grid[0].length - 1) return true;
      let dir = this.grid[x][y];
      currPos = this.increment(currPos, MinCost.DIRS[dir]);
    }

    return false;
  }

  tabulate() {
    for (let i = 0; i < this.dp.length; i++) {
      for (let j = 0; j < this.dp[i].length; j++) {
        if (this.dp[i][j] === null) {
          let above = this.dp[i-1][j] || Infinity;
          let below = this.dp[i+1][j] || Infinity;
          let left = this.dp[i][j-1] || Infinity;
          let right = this.dp[i][j+1] || Infinity;

          let cost = Math.min(above, below, left, right) + 1; 
          this.dp[i][j] = cost;
          let res = this.followPath([i, j], cost);
          if (res) return res;
        }
      }
    }

    return this.dp[this.grid.length - 1][this.grid.length[0] - 1];
  }

  followPath(pos, cost) {
    let currPos = pos;
    while (this.validPos(currPos) && !this.freePositions.has(currPos.toString())) {
      this.freePositions.add(currPos.toString());
      let [x, y] = currPos;
      this.dp[x][y] = cost;
      if (x === this.grid.length - 1 && y === this.grid[0].length - 1) return cost;
      let dir = this.grid[x][y];
      currPos = this.increment(currPos, MinCost.DIRS[dir]);
    }

    return false;
  }
  
  buildPathBack() {
    let x = this.grid.length - 1;
    let y = this.grid[0].length - 1;

    let costAbove = costToSpot([x-1, y]);
    let costLeft = costToSpot([x, y-1]);

    function costToSpot(pos) {
      if (!this.validPos(pos)) return Infinity;
      if (this.freePositions.has(pos.toString)) return 0;
      
      
    }
    
    return Math.min(costAbove, costLeft) + 1;
  }



  increment(pos, dir) {
    return [pos[0] + dir[0], pos[1] + dir[1]];
  }
  
  validPos(pos) {
    let [x, y] = pos;
    return x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[0].length;
  }
}

MinCost.DIRS = {
  1: [0, 1],
  2: [0, -1],
  3: [1, 0],
  4: [-1, 0]
}