// O(kn) where k is # of letters in word, and n is # of words
var sortStringArray = function(strArr, idx = 0) {
  if (strArr.length <= 1) return strArr;
  let alpha = new Array(26);
  let result = [];

  for (let i = 0; i < strArr.length; i++) {
    let char = strArr[i][idx]
    if (char === undefined) {
      result.push(strArr[i]);
    } else {
      let slot = (char.charCodeAt(0) + 7) % 26;
      if (!alpha[slot]) alpha[slot] = [];
      alpha[slot].push(strArr[i]);
    }
  }

  for (let i = 0; i < alpha.length; i++) {
    if (alpha[i] === undefined) continue;
    let subResult = sortStringArray(alpha[i], idx + 1);
    subResult.forEach(word => result.push(word));
  }

  return result;
}