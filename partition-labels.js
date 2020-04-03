/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function (S) {
  const indices = {};

  for (let i = 0; i < S.length; i++) {
    indices[S[i]] = i;
  }

  let start = 0;
  let end;
  const partitions = [];

  for (let i = 0; i < S.length; i++) {
    const lastIndex = indices[S[i]];
    if (!end || lastIndex > end) end = lastIndex;

    if (end === i) {
      partitions.push(end - start + 1);
      start = end + 1;
    }
  }

  return partitions;
};