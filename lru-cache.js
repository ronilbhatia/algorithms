/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.map = {};
  this.list = new LinkedList();
  this.capacity = capacity;
  this.count = 0;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  let node = this.map[key];
  if (node === undefined) return -1;
  node.remove();
  this.list.add(node);
  return node.val[1];
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.get(key) === -1) {
    let node = new Node([key, value]);
    this.list.add(node);
    this.map[key] = node;
    this.count++;

    if (this.count > this.capacity) {
      let removedNode = this.list.remove();
      delete this.map[removedNode.val[0]];
      this.count--;
    }
  } else {
    let node = this.map[key];
    node.remove();
    node = new Node([key, value]);
    this.list.add(node);
    this.map[key] = node;
  }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

var LinkedList = function () {
  this.head = new Node(null);
  this.tail = new Node(null);
  this.head.next = this.tail;
  this.tail.prev = this.head;
}

LinkedList.prototype.add = function (node) {
  let last = this.tail.prev;
  last.next = node;
  node.prev = last;
  node.next = this.tail;
  this.tail.prev = node;
}

LinkedList.prototype.remove = function () {
  let node = this.head.next
  node.remove();
  return node;
}

var Node = function (val) {
  this.val = val;
  this.next = null;
  this.prev = null;
}

Node.prototype.remove = function() {
  let prev = this.prev;
  let next = this.next;

  prev.next = next;
  next.prev = prev;

  this.prev = null;
  this.next = null;
}