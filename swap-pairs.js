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
var swapPairs = function (head) {
  if (!head || !head.next) return head;

  // Grab next node and it's next node
  // Set next node's next to head, and set head's next to next next
  // BUT next next could get swapped further so set it to return val of recursive
  // call to swapping the list starting at next next.
  let next = head.next;
  let nextNext = next.next;
  next.next = head;
  head.next = swapPairs(nextNext);

  return next;
};