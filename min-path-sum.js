/**
 * @param {number[][]} grid
 * @return {number}
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */

// DP Solution (1D-Arr)
var minPathSum = function (grid) {
  if (!grid.length || !grid[0].length) return 0;

  let dp = new Array(grid.length).fill(0);
  dp[0] = grid[0][0];
  for (let i = 1; i < dp.length; i++) dp[i] = dp[i - 1] + grid[0][i];

  for (let i = 1; i < grid.length; i++) {
    for (let j = 0; j < dp.length; j++) {
      if (j === 0) {
        dp[j] = dp[j] + grid[i][j];
      } else {
        let best = Math.min(dp[j - 1], dp[j]);
        dp[j] = best + grid[i][j];
      }
    }
  }

  return dp[dp.length - 1];
}

// DP Solution (2D-Arr)
var minPathSum = function (grid) {
  if (!grid.length || !grid[0].length) return 0;

  let dp = new Array(grid.length).fill(0).map(el => new Array(grid[0].length).fill(0));
  dp[0][0] = grid[0][0];
  for (let i = 1; i < dp[0].length; i++) dp[0][i] = dp[0][i - 1] + grid[0][i];
  for (let i = 1; i < dp.length; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[i].length; j++) {
      let prev = Math.min(dp[i][j - 1], dp[i - 1][j]);
      dp[i][j] = prev + grid[i][j];
    }
  }

  return dp[grid.length - 1][grid[0].length - 1];
}

// Failed Dijkstra's attempt
var minPathSum = function (grid) {
  if (!grid.length || !grid[0].length) return 0;

  let pq = new PriorityQueue((a, b) => a[0] > b[0]);
  pq.insert([grid[0][0], [0, 0]]);

  let lastRow = grid.length - 1;
  let lastCol = grid[0].length - 1;
  let best;
  let memo = {};
  while (!pq.empty()) {
    let [currSum, pos] = pq.remove();
    let key = pos.toString();
    if (memo.hasOwnProperty(key) && memo[key] < currSum) continue;
    memo[key] = currSum;

    if (pos[0] === lastRow && pos[1] === lastCol) {
      if (!best || currSum < best) best = currSum;
      continue;
    }

    let nextPos1 = [pos[0] + 0, pos[1] + 1];
    let nextPos2 = [pos[0] + 1, pos[1] + 0];

    [nextPos1, nextPos2].forEach(nextPos => {
      if (nextPos[0] > lastRow || nextPos[1] > lastCol) return;
      pq.insert([currSum + grid[nextPos[0]][nextPos[1]], nextPos])
    });
  }

  return best;
};

class PriorityQueue {
  constructor(cb) {
    this.store = [null];
    this.cb = cb;
  }

  getParent(idx) {
    return Math.floor(idx / 2);
  }

  getLeftChild(idx) {
    return idx * 2;
  }

  getRightChild(idx) {
    return (idx * 2) + 1;
  }

  insert(el) {
    this.store.push(el);
    this.siftUp(this.store.length - 1);
  }

  siftUp(idx) {
    if (idx === 1) return;

    let parentIdx = this.getParent(idx);
    let parent = this.store[parentIdx];

    if (this.cb(this.store[idx], this.store[parentIdx])) {
      [this.store[idx], this.store[parentIdx]] = [this.store[parentIdx], this.store[idx]];
      this.siftUp(parentIdx);
    }
  }

  remove(el) {
    if (this.store.length === 1) return null;
    if (this.store.length === 2) return this.store.pop();
    let first = this.store[1];
    this.store[1] = this.store.pop();

    this.siftDown(1);
    return first;
  }

  siftDown(idx) {
    let leftChild = this.getLeftChild(idx);
    let rightChild = this.getRightChild(idx);

    if (!this.store[leftChild] && !this.store[rightChild]) return;

    let betterChild = this.store[rightChild] && this.cb(this.store[rightChild], this.store[leftChild]) ?
      rightChild : leftChild;

    if (this.cb(this.store[betterChild], this.store[idx])) {
      [this.store[betterChild], this.store[idx]] = [this.store[idx], this.store[betterChild]];
      this.siftDown(betterChild);
    }
  }

  empty() {
    return this.store.length === 1
  }
}