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

// Iterative
var reverseList = function (head) {
  let nodeArr = [];
  let curr = head;

  while (curr) {
    nodeArr.push(curr);
    curr = curr.next;
  }

  for (let i = 0; i < nodeArr.length; i++) {
    nodeArr[i].next = nodeArr[i - 1] || null;
  }

  return nodeArr[nodeArr.length - 1] || head;
}
 
// Recursive
var reverseList = function (head, prev = null) {
  if (!head) return null;
  if (!head.next) {
    head.next = prev;
    return head;
  } else {
    let res = reverseList(head.next, head);
    head.next = prev;
    return res;
  }
};