/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
  const visitedRooms = new Set(0);

  let queue = [0];

  while (queue.length) {
    let currRoom = queue.shift();
    let nextRooms = rooms[currRoom];

    nextRooms.forEach(room => {
      if (visitedRooms.has(room)) continue;
      visitedRooms.add(room);
      queue.push(room);
    });
  }

  return visitedRooms.size === rooms.length;
};