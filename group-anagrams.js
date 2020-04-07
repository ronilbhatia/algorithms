/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  let strHash = {};

  strs.forEach(str => {
    let sorted = str.split('').sort().join('');
    strHash[sorted] = str;
  });

  return Object.values(strHash);
};