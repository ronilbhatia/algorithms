/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  // Add counts of each num to hash (O(n))
  let counts = {}
  nums.forEach(num => {
    if (!counts.hasOwnProperty(num)) counts[num] = 0;
    counts[num]++;
  });

  // Add num with count to priority queue (O(n))
  let pq = new PriorityQueue((a, b) => a.count - b.count > 0);
  Object.keys(counts).forEach(num => {
    pq.insert({ num, count: counts[num] });
  });
  
  // Remove k nums from priority queue (O klog(n))
  let mostFrequent = [];
  while (mostFrequent.length < k) {
    mostFrequent.push(pq.remove().num);
  }

  return mostFrequent;
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
    return idx * 2 + 1;
  }

  insert(el) {
    this.store.push(el);
    this.heapifyUp(this.store.length - 1);
  }

  heapifyUp(idx) {
    let parentIdx = this.getParent(idx);
    if (parentIdx === 0) return;

    if (this.cb(this.store[idx], this.store[parentIdx])) {
      [this.store[idx], this.store[parentIdx]] = [this.store[parentIdx], this.store[idx]];
      this.heapifyUp(parentIdx);
    }
  }

  remove() {
    if (this.store.length === 1) return null;
    if (this.store.length === 2) return this.store.pop();
    let top = this.store[1];
    this.store[1] = this.store.pop();
    this.heapifyDown(1);
    return top;
  }

  heapifyDown(idx) {
    let leftIdx = this.getLeftChild(idx);
    let rightIdx = this.getRightChild(idx);
    let leftChild = this.store[leftIdx];
    let rightChild = this.store[rightIdx];

    if (leftChild === undefined) return;
    let betterIdx = (rightChild && this.cb(rightChild, leftChild)) ? rightIdx: leftIdx;

    if (this.cb(this.store[betterIdx], this.store[idx])) {
      [this.store[betterIdx], this.store[idx]] = [this.store[idx], this.store[betterIdx]];
      this.heapifyDown(betterIdx);
    }
  }
}