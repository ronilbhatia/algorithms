// 1st Problem
/**
 * @param {string} date1
 * @param {string} date2
 * @return {number}
 */

var daysBetweenDates = function(date1, date2) {
  let dateOne = new Date(date1);
  let dateTwo = new Date(date2);
  let diff = Math.abs(dateOne - dateTwo);

  return Math.floor(diff / 1000 / 60 / 60 / 24);
}

// 2nd Problem
/**
 * @param {number} n
 * @param {number[]} leftChild
 * @param {number[]} rightChild
 * @return {boolean}
 */
var validateBinaryTreeNodes = function (n, leftChild, rightChild) {
  let nums = new Set();
  for (let i = 0; i < n; i++) nums.add(i);
  leftChild.forEach(val => nums.delete(val));
  rightChild.forEach(val => nums.delete(val));

  if (nums.size !== 1) return false;
  let root = nums.values().next().value;

  let parents = {};
  let queue = [root];

  while (queue.length) {
    let curr = queue.shift();
    let left = leftChild[curr];
    let right = rightChild[curr];

    if (left !== -1) {
      if (parents.hasOwnProperty(left)) return false;
      if (parents[curr] === left) return false;
      parents[left] = curr;
      queue.push(left);
    }

    if (right !== -1) {
      if (parents.hasOwnProperty(right)) return false;
      if (parents[curr] === right) return false;
      parents[right] = curr;
      queue.push(right);
    }
  }

  return true;
};

// 3rd Problem
/**
 * @param {number} num
 * @return {number[]}
 */
var closestDivisors = function (num) {
  let plusOneFacts = closestFactors(num + 1);
  let plusTwoFacts = closestFactors(num + 2);

  let diffOne = plusOneFacts[1] - plusOneFacts[0];
  let diffTwo = plusTwoFacts[1] - plusTwoFacts[0];

  return (diffOne < diffTwo) ? plusOneFacts : plusTwoFacts;
};

function closestFactors(num) {
  let factors = [];

  for (let i = 1; i <= Math.sqrt(num); i++) {
    if ((num % i) === 0) factors.push([i, num / i]);
  }

  return factors[factors.length - 1];
}

// 4th Problem
var largestMultipleOfThree = function(digits) {
  if (digits.length === 0) return '';
  digits.sort((a, b) => b - a);
  let sum = digits.reduce((sum, num) => sum + num);

  let mod = sum % 3;
  if (mod === 0) {
    if (parseInt(digits) === 0) return '0';
    return digits.join('')
  } else {
    return handleMod(digits, mod);
  }
}

function handleMod(digits, mod) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] % 3 === mod) {
      digits.splice(i, 1);
      if (digits.length === 0) return '';
      if (parseInt(digits) === 0) return '0';
      return digits.join('')
    }
  }

  let first;
  for (let i = digits.length - 1; i >= 0; i--) {
    if ((digits[i] % 3) === (3 - mod)) {
      if (first === undefined) {
        first = i;
        continue;
      } else {
        digits.splice(first, 1);
        digits.splice(i, 1);
        if (digits.length === 0) return '';
        if (parseInt(digits) === 0) return '0';
        return digits.join('')
      };
    }
  }

  return '';
}
// var largestMultipleOfThree = function (digits) {
//   digits.sort((a, b) => b - a);
  
//   return helper('', digits, 0) || '';
// };

// function helper(numStr, nums, startIdx, largest) {
//   for (let i = startIdx; i < nums.length; i++) {
//     let currNum = numStr = nums[i].toString();
//     if (currNum % 3 === 0) {
//       if (!largest || parseInt(currNum) > largest) largest = parseInt(currNum);
//     }

//     // let result = helper(currNum, nums, i + 1)
//     // if (result) return result;
//   };

//   return largest;
// }


// function combinations(arr) {
//   if (arr.length <= 1) return [arr];

//   let next = arr.pop();
//   let prevcombos = combinations(arr);
//   let combos = prevcombos.slice();

//   prevcombos.forEach(combo => {
//     let curr = combo.slice()
//     curr.push(next);
//     combos.push(curr);
//   });

//   combos.push([next]);

//   return combos;
// }

// function permutations(arr) {
//   if (arr.length <= 1) return [arr];

//   let last = arr.pop();
//   let prevPerms = permutations(arr);
//   let newPerms = [];

//   prevPerms.forEach(perm => {
//     for (let i = 0; i <= perm.length; i++) {
//       let currPerm = perm.slice(0, i)
//       currPerm.push(last);
//       currPerm = currPerm.concat(perm.slice(i))
      
//       newPerms.push(currPerm);
//     }
//   });

//   return newPerms;
// }