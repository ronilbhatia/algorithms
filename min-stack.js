/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.store = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  let min = this.store.length ? this.store[this.store.length - 1][1] : Infinity;
  if (x < min) min = x;
  this.store.push([x, min]);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  return this.store.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.store.length ? this.store[this.store.length - 1][0] : null;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.store.length ? this.store[this.store.length - 1][1] : null;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */