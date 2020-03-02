var lengthOfLongestSubstring = function (s) {
  let best = 0;
  let set = new Set();
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    const currChar = s[i];
    while (set.has(currChar)) {
      set.delete(s[start]);
      start++;
    }
    set.add(currChar);
    best = Math.max(best, i - start + 1)
  }

  return best;
};