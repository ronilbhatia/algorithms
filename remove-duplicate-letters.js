/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  let visited = new Set();
  let letterCount = {};
  let res = [];

  // Create letterCount hash
  for (let i = 0; i < s.length; i++) {
    if (!letterCount.hasOwnProperty(s[i])) letterCount[s[i]] = 0;
    letterCount[s[i]]++;
  }

  for (let i = 0; i < s.length; i++) {
    letterCount[s[i]]--;
    if (!visited.has(s[i])) {
      while (res.length && s[i] < res[res.length - 1] && letterCount[res[res.length - 1]] > 0) {
        let last = res.pop();
        visited.delete(last)
      }
      res.push(s[i]);
      visited.add(s[i]);
    }
  }

  return res.join('');
};

// Linked List implementation that I don't need lol
// var Node = function(val) {
//   this.val = val;
//   this.next = null;
//   this.prev = null;
// }

// Node.prototype.remove = function() {
//   let prev = this.prev;
//   let next = this.next;
//   prev.next = next;
//   next.prev = prev;

//   this.next = this.prev = null;
// }

// var LinkedList = function() {
//   this.head = new Node(null);
//   this.tail = new Node(null);
//   this.head.next = this.tail
//   this.tail.prev = this.head;
// }

// LinkedList.prototype.insert = function(node) {
//   let prevLast = this.tail.prev;
//   prevLast.next = node;
//   node.next = this.tail;
//   node.prev = prevLast;
//   this.tail.prev = node;
// }