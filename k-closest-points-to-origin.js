/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */
var kClosest = function (points, K) {
  let pq = new PriorityQueue((a, b) => (a[0] ** 2 + a[1] ** 2) < (b[0] ** 2 + b[1] ** 2), points)
  let res = [];

  for (let i = 0; i < K; i++) res.push(pq.remove());
  return res;
};

class PriorityQueue {
  constructor(cb, initialArr = []) {
    this.store = [null, ...initialArr];
    this.cb = cb;
    this.heapify();
  }

  heapify() {
    for (let i = this.store.length - 1; i > 0; i--) this.siftDown(i);
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

    if (this.cb(this.store[idx], this.store[parentIdx])) {
      [this.store[idx], this.store[parentIdx]] = [this.store[parentIdx], this.store[idx]];
      this.siftUp(parentIdx);
    }
  }

  remove() {
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