var balancedStringSplit = function (s) {
  let count = 0;
  let rCount = 0;
  let lCount = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'R') rCount++;
    if (s[i] === 'L') lCount++;

    if (lCount === rCount) {
      count++;
      L = 0;
      R = 0;
    }
  }

  return count;
};