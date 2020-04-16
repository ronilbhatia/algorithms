/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  if (!head) return null;
  let length = 0;
  let curr = head;
  while (curr) {
    length += 1;
    curr = curr.next;
  }

  return _sortedListToBST(head, 0, length - 1);
};

var _sortedListToBST = function (head, start, end) {
  if (end < start) return null;
  let mid = Math.floor((start + end) / 2);

  let p = start;
  let rootHead = head;
  while (p < mid) {
    rootHead = rootHead.next;
    p++;
  }

  let root = new TreeNode(rootHead.val);
  root.left = _sortedListToBST(head, start, mid - 1);
  root.right = _sortedListToBST(rootHead.next, mid + 1, end);
  return root;
}