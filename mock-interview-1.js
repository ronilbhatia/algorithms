// 1
/**
 * @param {string} s
 * @return {boolean}
 */
var checkRecord = function (s) {
  let absentCount = 0;
  let previousLates = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'A') {
      absentCount++;
      if (absentCount === 2) return false;
    }
    
    if (s[i] === 'L') {
      previousLates++;
      if (previousLates === 3) return false;
    } else {
      previousLates = 0;
    }
  }

  return true;
};

// 2
/**
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
var networkDelayTime = function (times, N, K) {
  let graph = buildGraph(times);
  return timeFromKToN(graph, K, N);
};

function timeFromKToN(graph, K, N, cost = 0) {
  let visitedNodes = new Set();

  let queue = new PriorityQueue((a, b) => a[1] - b[1] < 0)
  queue.insert([K.toString(), 0]);

  while (!queue.empty()) {
    debugger
    let [nodeVal, costToNode] = queue.remove();

    if (visitedNodes.has(nodeVal)) continue; // we've been here before, faster
    visitedNodes.add(nodeVal);

    N--;
    if (N === 0) return costToNode;

    if (!graph.hasOwnProperty(nodeVal)) continue;

    let costs = graph[nodeVal];
    let children = Object.keys(costs);
    children.forEach(child => {
      let cost = costToNode + costs[child];
      queue.insert([child, cost]);
    })
  }

  return -1;
}

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
    return idx * 2 + 1;
  }

  insert(el) {
    this.store.push(el);
    this.heapifyUp(this.store.length - 1);
  }

  heapifyUp(idx) {
    if (idx === 1) return;
    let parentIdx = this.getParent(idx)
    if (this.cb(this.store[idx], this.store[parentIdx])) {
      [this.store[idx], this.store[parentIdx]] = [this.store[parentIdx], this.store[idx]];
      this.heapifyUp(parentIdx);
    }
  }

  remove() {
    if (this.store.length === 1) return null;
    if (this.store.length === 2) return this.store.pop();
    const top = this.store[1];
    this.store[1] = this.store.pop();
    this.heapifyDown(1)
    return top;
  }

  heapifyDown(idx) {
    const leftChild = this.getLeftChild(idx);
    const rightChild = this.getRightChild(idx);
    const leftVal = this.store[leftChild];
    const rightVal = this.store[rightChild];

    if (leftVal === undefined && rightVal === undefined) return;
    const betterChild = (rightVal && this.cb(rightVal, leftVal)) ? rightChild : leftChild;

    if (this.cb(this.store[betterChild], this.store[idx])) {
      [this.store[idx], this.store[betterChild]] = [this.store[betterChild], this.store[idx]];
      this.heapifyDown(betterChild);
    }
  }

  empty() {
    return this.store.length === 1;
  }
}

function buildGraph(times) {
  let graph = {};

  times.forEach(time => {
    let [source, dest, cost] = time;

    if (!graph.hasOwnProperty(source)) graph[source] = {};
    graph[source][dest] = cost;
  })

  return graph;
}