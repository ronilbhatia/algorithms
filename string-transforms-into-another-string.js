var canConvert = function (str1, str2) {
  if (str1.length !== str2.length) return false;
  let conversionHash = {};
  let convertedTo = new Set();
  
  for (let i = 0; i < str1.length; i++) {
    if (!conversionHash.hasOwnProperty(str1[i])) {
      conversionHash[str1[i]] = str2[i];
      convertedTo.add(str2[i]);
    } else if (conversionHash[str1[i]] !== str2[i]) return false;
  }

  if (convertedTo.size === 26 && str1 !== str2) return false;

  return Object.keys(conversionHash).length >= convertedTo.size;
}
