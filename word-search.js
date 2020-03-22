/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
// Mutating input board
var exist = function (board, word) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === word[0]) {
        board[i][j] = '.';
        let res = dfs(board, [i, j], word, 1)
        board[i][j] = word[0];
        if (res) return res;
      }
    }
  }

  return false;
};

const MOVE_DIFFS = [[0, 1], [0, -1], [1, 0], [-1, 0]];

function dfs(board, pos, word, wordIdx) {
  if (wordIdx === word.length) return true;

  for (let i = 0; i < MOVE_DIFFS.length; i++) {
    let nextPos = incrementPos(pos, MOVE_DIFFS[i]);
    if (!validPos(nextPos, board)) continue;
    let [x, y] = nextPos;
    if (board[x][y] === word[wordIdx]) {
      board[x][y] = '.'
      let res = dfs(board, nextPos, word, wordIdx + 1)
      board[x][y] = word[wordIdx];
      if (res) return res;
    }
  }

  return false;
}

function incrementPos(pos, diff) {
  return [pos[0] + diff[0], pos[1] + diff[1]];
}

function validPos(pos, board) {
  let [x, y] = pos;
  return x >= 0 && x < board.length && y >= 0 && y < board[0].length;
}

// Using Set
var exist = function (board, word) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === word[0]) {
        let visited = new Set();
        let res = dfs(board, [i, j], word, 1, visited)
        if (res) return res;
      }
    }
  }

  return false;
};

function dfs(board, pos, word, wordIdx, visited) {
  if (wordIdx === word.length) return true;

  visited.add(pos.toString())

  for (let i = 0; i < MOVE_DIFFS.length; i++) {
    let nextPos = incrementPos(pos, MOVE_DIFFS[i]);
    if (!validPos(nextPos, board) || visited.has(nextPos.toString())) continue;
    let [x, y] = nextPos;
    if (board[x][y] === word[wordIdx]) {
      let res = dfs(board, nextPos, word, wordIdx + 1, new Set(visited))
      if (res) return res;
    }
  }

  return false;
}

function incrementPos(pos, diff) {
  return [pos[0] + diff[0], pos[1] + diff[1]];
}

function validPos(pos, board) {
  let [x, y] = pos;
  return x >= 0 && x < board.length && y >= 0 && y < board[0].length;
}