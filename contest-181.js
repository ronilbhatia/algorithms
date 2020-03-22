// Problem 1
/**
 * @param {number[]} nums
 * @param {number[]} index
 * @return {number[]}
 */
var createTargetArray = function (nums, index) {
  let target = [];

  for (let i = 0; i < nums.length; i++) {
    let idx = index[i];
    target = target.slice(0, idx).concat(nums[i]).concat(target.slice(idx))
  }

  return target;
};

// Problem 2
/**
 * @param {number[]} nums
 * @return {number}
 */
var sumFourDivisors = function (nums) {
  let allDivs = [];

  for (let i = 0; i < nums.length; i++) {
    let divs = divisors(nums[i]);
    if (divs) divs.forEach(div => allDivs.push(div));
  }

  if (!allDivs.length) return 0;
  return allDivs.reduce((sum, num) => sum + num);
};

function divisors(num) {
  let divs = [];

  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      divs.push(i);
      if (divs.length > 4) return false;
    }
  }

  return divs.length === 4 ? divs : false;
}

// Problem 3
/**
 * @param {number[][]} grid
 * @return {boolean}
 */

const DIRS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1]
};

const STREET_TYPES = {
  1: ['left', 'right'],
  2: ['up', 'down'],
  3: ['left', 'down'],
  4: ['right', 'down'],
  5: ['left', 'up'],
  6: ['right', 'up']
}

const OPPOSITES = {
  'left': 'right',
  'right': 'left',
  'up': 'down',
  'down': 'up'
}

var hasValidPath = function (grid) {
  let width = grid.length;
  let height = grid[0].length;
  let start = [0, 0];
  let lastX = width - 1;
  let lastY = height - 1;
  let queue = [start];
  let visited = new Set();
  visited.add(start.toString());

  while (queue.length) {
    let [x, y] = queue.shift();
    if (x === lastX && y === lastY) return true;
    let directions = STREET_TYPES[grid[x][y]];

    directions.forEach(direction => {
      let dir = DIRS[direction];
      let nextPos = incrementPos([x, y], dir);

      if (!validPos(nextPos, width, height) || visited.has(nextPos.toString())) return;
      let nextStreet = STREET_TYPES[grid[nextPos[0]][nextPos[1]]];
      if (!nextStreet.includes(OPPOSITES[direction])) return;
      visited.add(nextPos.toString());
      queue.push(nextPos);
    });
  }

  return false;
};

function incrementPos(pos, dir) {
  return [pos[0] + dir[0], pos[1] + dir[1]];
}

function validPos(pos, width, height) {
  let [x, y] = pos;
  return x >= 0 && x < width && y >= 0 && y < height;
}

// Problem 4
/**
 * @param {string} s
 * @return {string}
 */
var longestPrefix = function (s) {
  let longest = ""
  let prefix = "";
  let suffix = "";

  for (let i = 0; i < s.length - 1; i++) {
    prefix += s[i];
    suffix = s[s.length - 1 - i] + suffix;

    if (prefix === suffix) longest = prefix;
  }

  return longest;
};