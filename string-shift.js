/**
 * @param {string} s
 * @param {number[][]} shift
 * @return {string}
 */
var stringShift = function (s, shift) {
  let start = 0;

  for (let i = 0; i < shift.length; i++) {
    let [dir, mag] = shift[i];

    if (dir === 0) {
      start = (start + mag) % s.length
    } else {
      start = (start - mag) % s.length
      if (start < 0) start += s.length
    }
  }

  return res.slice(start) + res.slice(0, start);
};