/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  let maxHeap = new MaxHeap();
  nums.forEach(num => maxHeap.insert(num));

  let i = 0;
  let kthLargest;
  while (i < k) {
    kthLargest = maxHeap.remove();
    i += 1;
  }

  return kthLargest;
};

class MaxHeap {
  constructor() {
    this.store = [null];
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
    this.siftUp(this.store.length - 1);
  }

  siftUp(idx) {
    if (idx === 1) return;
    let parentIdx = this.getParent(idx);
    if (this.store[idx] > this.store[parentIdx]) {
      [this.store[idx], this.store[parentIdx]] = [this.store[parentIdx], this.store[idx]];
      this.siftUp(parentIdx);
    }
  }

  remove() {
    if (this.store.length === 1) return null;
    if (this.store.length === 2) return this.store.pop();

    let top = this.store[1];
    this.store[1] = this.store.pop();
    this.siftDown(1)
    return top;
  }

  siftDown(idx) {
    let leftChildIdx = this.getLeftChild(idx);
    let rightChildIdx = this.getRightChild(idx);
    if (this.store[leftChildIdx] === undefined) return;
    let betterIdx = (this.store[rightChildIdx] !== undefined && this.store[rightChildIdx] > this.store[leftChildIdx]) ? rightChildIdx : leftChildIdx;
    if (this.store[betterIdx] > this.store[idx]) {
      [this.store[betterIdx], this.store[idx]] = [this.store[idx], this.store[betterIdx]];
      this.siftDown(betterIdx);
    }
  }
}