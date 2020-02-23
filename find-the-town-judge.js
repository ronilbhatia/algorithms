/**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (N, trust) {
  if (N === 1) return 1;
  const iTrust = new Set();
  const trustMe = {};

  for (let i = 0; i < trust.length; i++) {
    let [source, dest] = trust[i];

    if (!iTrust.has(source)) iTrust.add(source.toString());
    if (!trustMe[dest]) trustMe[dest] = 0;
    trustMe[dest]++;
  };

  // let trustMes = Object.keys(trustMe);
  for (let dest in trustMe) {
    if (trustMe[dest] === N - 1 && !iTrust.has(dest)) return dest;
  }

  return -1;
};