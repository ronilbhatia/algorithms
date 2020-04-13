/**
 * @param {string[]} words
 * @return {string[]}
 */
var stringMatching = function (words) {
  let res = [];

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (i !== j && (words[j].includes(words[i]))) {
        res.push(words[i]);
        break;
      }
    }
  }

  return res;
};

/**
 * @param {number[]} queries
 * @param {number} m
 * @return {number[]}
 */
var processQueries = function (queries, m) {
  let perm = new Array(m).fill(0).map((el, idx) => idx + 1);
  let res = [];

  for (let i = 0; i < queries.length; i++) {
    let num = queries[i];
    let idx = perm.indexOf(num);
    res.push(idx);
    perm.unshift(perm.splice(idx, 1));
  }

  return res;
};

/**
 * @param {string} text
 * @return {string}
 */
const HTML = {
  "&quot;": "\"",
  "&apos;": "'",
  "&amp;": "&",
  "&gt;": ">",
  "&lt;": "<",
  "&frasl;": "/"
}

var entityParser = function (text) {
  let result = text;

  for (let key in HTML) {
    let prev = result;
    result = result.replace(key, HTML[key]);

    while (prev !== result) {
      prev = result;
      result = result.replace(key, HTML[key]);
    }
  }

  return result;
};

/**
 * @param {number} n
 * @return {number}
 */
var numOfWays = function (n) {
  let res = helper(n);
  return (res[0] + res[1]) % (10n ** 9n + 7n);
};

function helper(n) {
  if (n === 1) {
    return {
      0: 6n, // 0 = color combination similar to ABA
      1: 6n, // 1 = color combination similar to ABC
    };
  }

  let prev = helper(n - 1);

  return {
    0: prev[0] * 3n + prev[1] * 2n,
    1: prev[0] * 2n + prev[1] * 2n
  }
}

let combos = {
  '010': ['101', '102', '121', '201', '202'],
  '020': ['101', '102', '201', '202', '212'],
  '101': 5,
  '121': 5,
  '202': 5,
  '212': 5,
  '012': ['120', '121', '101', '201'],
  '120': 4,
  '201': 4,
  '021': 4,
  '102': 4,
  '210': 4
}