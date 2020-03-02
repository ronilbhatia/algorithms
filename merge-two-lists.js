var mergeTwoLists = function (l1, l2) {
  if (!l1 && !l2) return null;
  if (!l1 || !l2) return l1 ? l1 : l2;

  let one = l1;
  let two = l2;
  let head = (one.val < two.val) ? one : two;

  while (one && two) {
    if (one.val < two.val) {
      let nextOne = one.next;
      one.next = (nextOne && nextOne.val < two.val) ? nextOne : two;
      one = nextOne;
    } else {
      let nextTwo = two.next;
      two.next = (nextTwo && nextTwo.val <= one.val) ? nextTwo : one;
      two = nextTwo;
    }
  }

  return head;
};