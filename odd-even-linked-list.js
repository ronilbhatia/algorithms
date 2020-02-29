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

// Go in twos
var oddEvenList = function(head) {
  if (!head) return head;

  function unravel(head) {
    if (!head.next || !head.next.next) return [head, head.next, head];

    let [list1, list2, lastOdd] = unravel(head.next.next);
    head.next.next = list2;
    list2 = head.next;
    head.next = list1;

    return [head, list2, lastOdd];
  }

  let [odd, even, lastOdd] = unravel(head);
  lastOdd.next = even;
  return odd;
}

// Go in ones
var oddEvenList = function (head) {
  function unravel(head) {
    if (!head || !head.next) return [head, null];

    let [list1, list2] = unravel(head.next);
    head.next = list2;
    return [head, list1];
  } 

  let [odd, even] = unravel(head);
  let lastOdd = odd;
  while (lastOdd.next) lastOdd = lastOdd.next;
  lastOdd.next = even;

  return odd;
};