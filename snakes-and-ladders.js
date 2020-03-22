/**
 * @param {number[][]} board
 * @return {number}
 */
// 1. Start on square 1
// 2. Examine all valid moves - prioritize snakes/ladders
// 3. Use BFS to ensure shortest path - don't visit the same position twice

// OPTIMIZATION 1 (time)
// When adding spots to queue start with biggest spot and go backwards. Once we 
// find a spot with -1, the only other spots we care about are snake/ladder spots,
// because from other -1 spots we'd only get to spots we either already got to
// this round, or would get to, from the highest -1 spot we do find.

// OPTIMIZATION 2 (space)
// Rather than maintaining spot of visited positions, turn positions into 0 on 
// board once we've visited them and ignore spots with 0.
var snakesAndLadders = function (board) {
  if (!board.length || !board[0].length) return null;
  let rows = board.length;
  let cols = board[0].length;

  // spot in queue => [spot, numMoves]
  let queue = [[1, 0]];

  while (queue.length) {
    let [spot, numMoves] = queue.shift();
    if (spot === rows * cols) return numMoves;
    let nextMoves = [spot + 6, spot + 5, spot + 4, spot + 3, spot + 2, spot + 1];
    let nextSpots = findNextSpots(nextMoves, board, rows, cols);
    nextSpots.forEach(spot => queue.push([spot, numMoves + 1]))
  }

  return -1;
};

function findNextSpots(moves, board, rows, cols) {
  let nextSpots = [];
  let foundNormalSpot = false;
  moves.forEach(move => {
    if (move > rows * cols) return;
    let x = rows - Math.floor((move - 1) / rows) - 1;
    let y = (x % 2 === 1 && rows % 2 === 0 || x % 2 === 0 && rows % 2 === 1) ? (move - 1) % cols : cols - ((move -1) % cols) - 1;

    let spot = move;
    if (board[x][y] > 0) {
      spot = board[x][y];
    } else if (board[x][y] === 0 || foundNormalSpot) {
      return
    } else {
      foundNormalSpot = true;
    }

    board[x][y] = 0;

    nextSpots.push(spot);
  });

  return nextSpots;
}