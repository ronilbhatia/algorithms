// IMPLEMENTATION 1 - Brute Force
  // Time Complexity: O(n^2) -> iterating over the array multiple times 
  // + nested iterations for compute

  // Space Complexity: O(n) -> Array to hold chars of string. Left, right and 
  // middle arrays would make is 2n but still O(n)
function basicCalculator(str) {
  // Create array of nums and operands
  let strArr = str.split('')
  strArr = strArr.filter(el => el!== ' ');
  
  // Iterate over the array continuously until all parentheses are gone,
  // evaluating the innermost parentheses each run through, and updating strArr
  while(strArr.includes('(')) {
    let i = 0;
    let start, end;

    while(i < strArr.length) {
      if(strArr[i] === '(') {
        start = i;
      } else if (strArr[i] === ')') {
        end = i;
        break;
      }
      i += 1
    }

    const leftArr = strArr.slice(0, start);
    const rightArr = strArr.slice(end + 1);
    const currArr = strArr.slice(start + 1, end);
    const result = compute(currArr);

    strArr = leftArr.concat(result).concat(rightArr)
  }
  // Evaluate what's left
  return compute(strArr);
}

function compute(strArr) {
  const operands = ['+', '-'];
  let result = 0;
  let currStr = strArr[0];
  let operand = '+';

  for (let i = 1; i < strArr.length; i++) {
    const element = strArr[i];
    if(operands.includes(element)) {
      nextNum = parseInt(currStr);
      if (operand === '+') {
        result += nextNum;
      } else {
        result -= nextNum;
      }
      currStr = ''
      operand = element;
    } else {
      currStr += element;
    }
  }

  nextNum = parseInt(currStr);
  if (operand === '+') {
    result += nextNum;
  } else {
    result -= nextNum;
  }

  return result;
}

// console.log(basicCalculator('((-1+(2+3-(5-2))))'));

// IMPLEMENTATION 2 - Using an array to keep track of open paren indices
function basicCalculator2(str) {
  // Create array of nums and operands
  let strArr = str.split('').filter(el => el !== ' ');
  const openParens = [];
  // Iterate over the array keeping track of open parens in an array, and 
  // evaluating subArr from last open paren when hitting a close paren
  let i = 0;
  while (i < strArr.length) {
    const element = strArr[i];
    if (element === '(') {
      openParens.push(i);
    } else if (element === ')') {
      // Grab elements between parens to evaluate
      const matchingOpenIndex = openParens.pop();
      const currArr = strArr.slice(matchingOpenIndex + 1, i);

      // Evaluate elements between parens and replace openParen with result
      const result = compute(currArr);
      strArr[matchingOpenIndex] = result;

      // Remove rest of the elements that were just evaluated inside parens
      const spliceLength = i - matchingOpenIndex;
      strArr.splice(matchingOpenIndex + 1, spliceLength);

      // Need to set i back since array has shrunk
      i -= spliceLength
    }
    i += 1;
  }
  // Evaluate what's left
  return compute(strArr);
}

console.log(basicCalculator2('(1 + (2 - 3))'));
console.log(basicCalculator2('((-1+(2+3-(5-2))))'));
// IMPLEMENTATION 3 - Using a stack