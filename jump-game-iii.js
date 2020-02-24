/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function (arr, start) {
  const visitedPositions = new Set();
  visitedPositions.add(start);

  let queue = [start];

  while (queue.length) {
    let curr = queue.shift();
    let range = arr[curr];
    if (range === 0) return true;

    let left = curr - range;
    if (left >= 0 && !visitedPositions.has(left)) {
      visitedPositions.add(left);
      queue.push(left);
    }

    let right = curr + range;
    if (right < arr.length && !visitedPositions.has(right)) {
      visitedPositions.add(right);
      queue.push(right);
    }
  }

  return false;
};