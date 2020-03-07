/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function (T) {
  let res = new Array(T.length);
  let stack = [0];

  for (let i = 1; i < T.length; i++) {
    let temp = T[i];
    let idx = stack[stack.length - 1];

    while (temp > T[idx]) {
      stack.pop();
      res[idx] = i - idx;
      idx = stack[stack.length - 1];
    }

    stack.push(i);
  }

  while (stack.length) {
    let idx = stack.pop();
    res[idx] = 0;
  }

  return res;
};