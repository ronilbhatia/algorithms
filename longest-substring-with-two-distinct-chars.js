var longestSubstring = function(string) {
  let firstLetter, secondLetter, firstIndexOfLastLetter
  let start = 0;
  let longest = 0;

  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    
    if (!firstLetter) {
      firstLetter = char;
      firstIndexOfLastLetter = i;
    } else if (!secondLetter && char !== firstLetter) {
      secondLetter = char;
      firstIndexOfLastLetter = i;
    } else if (secondLetter && char !== secondLetter) {
      if (char !== firstLetter) {
        [firstLetter, secondLetter]  = [secondLetter, char];
        start = firstIndexOfLastLetter;
      } else {
        [firstLetter, secondLetter] = [secondLetter, firstLetter];
      }
      firstIndexOfLastLetter = i;
    }

    let curr = i - start + 1;
    if (curr > longest) longest = curr;
  }

  return longest;
}

// eceba => 3
// ccaabbb => 5