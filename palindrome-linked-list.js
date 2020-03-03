/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */

// O(1) space forreal -> Reverse first half of linked list
var isPalindrome = function (head) {
  if (!head || !head.next) return true;
  let fast = slow = head;
  let rev = null;

  while (fast && fast.next) {
    fast = fast.next.next;
    let oldRev = rev;
    rev = slow
    slow = slow.next;
    rev.next = oldRev;
  }
  let secondHalf = fast ? slow.next : slow;
  while (secondHalf) {
    if (secondHalf.val !== rev.val) return false;
    secondHalf = secondHalf.next;
    rev = rev.next;
  }

  return true;
}

// Add some prev pointers
var isPalindrome = function (head) {
  if (!head || !head.next) return true;

  let prev = head;
  let curr = head.next;
  let length = 1;
  
  while (curr) {
    length++;
    curr.prev = prev;
    prev = curr;
    curr = curr.next;
  }

  let first = head;
  let last = prev;
  let times = Math.floor(length / 2);

  for (let i = 0; i < times; i++) {
    if (first.val !== last.val) return false;
    first = first.next;
    last = last.prev;
  }

  return true;
}

// Iterative
var isPalindrome = function (head) {
  let list = []

  let curr = head
  while (curr) {
    list.push(curr.val);
    curr = curr.next;
  }

  right = Math.floor(list.length / 2);
  left = right - 1;
  if (list.length % 2 !== 0) right += 1;

  while (left >= 0) {
    if (list[left] !== list[right]) return false;
    left -= 1
    right += 1
  }

  return true;
}
 
// Recursive
var isPalindrome = function (head) {
  if (!head) return true;

  let length = 0;
  let curr = head;
  while (curr) {
    length++;
    curr = curr.next;
  }

  function _isPalindrome(head, first, last) {
    if ((last - first) === 0) return true;
    if ((last - first) === 1) return [head.val === head.next.val, head.next.next];

    let [result, complement] = _isPalindrome(head.next, first + 1, last - 1);
    if (!result || complement.val !== head.val) return [false, null];
    return [true, complement.next];
  }
  
  return _isPalindrome(head, 0, length - 1)[0];
};

