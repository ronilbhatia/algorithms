/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// Method 2 - 2 pointers, 1 iteration
var middleNode = function (head) {
  let fast = head;
  let slow = head;

  while (fast.next) {
    fast = fast.next.next ? fast.next.next : fast.next;
    slow = slow.next;
  }

  return slow;
};

// Method 1 - 2 iterations
var middleNode = function (head) {
  let numNodes = 1;

  let node = head;
  while (node.next) {
    node = node.next;
    numNodes++;
  }

  node = head;
  for (let i = 0; i < Math.floor(numNodes / 2); i++) node = node.next;

  return node;
};