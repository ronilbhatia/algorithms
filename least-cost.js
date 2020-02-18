var mctFromLeafValues = function (arr) {
  if (arr.length === 2) return arr[0] * arr[1];

  let pairs = [];
  for (let i = 1; i < arr.length; i++) pairs.push(arr[i - 1] * arr[i]);

  let bestPair = Math.min(...pairs);
  let idx = pairs.indexOf(bestPair);
  let spliceIdx = arr[idx] < arr[idx+1] ? idx : idx + 1;
  arr.splice(spliceIdx, 1);

  return bestPair + mctFromLeafValues(arr);
};