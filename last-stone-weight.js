/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  stones.sort((a, b) => a - b);

  while (stones.length > 1) {
    let stone1 = stones.pop();
    let stone2 = stones.pop();
    if (stone1 === stone2) continue;

    let newStone = (stone1 > stone2) ? stone1 - stone2 : stone2 - stone1;

    for (let i = 0; i < stones.length; i++) {
      if (newStone <= stones[i]) {
        stones = stones.slice(0, i).concat(newStone).concat(stones.slice(i));
        break;
      }
    }

    stones.push(newStone);
  }

  return stones[0] || 0;
};