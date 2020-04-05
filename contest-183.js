// Problem 1
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var minSubsequence = function (nums) {
  nums.sort((a, b) => b - a);

  let sum = nums.reduce((sum, num) => sum + num);

  let res = [];
  let halfSum = 0;

  for (let i = 0; i < nums.length; i++) {
    halfSum += nums[i];
    res.push(nums[i]);

    if (halfSum > (sum / 2)) return res;
  }
};
// Problem 2
/**
 * @param {string} s
 * @return {number}
 */
var numSteps = function (s) {
  let num = parseInt(s, 2);
  let count = 0;

  while (num > 1) {
    console.log(num);
    if (num % 2 === 0) {
      num /= 2;
    } else {
      num += 1;
    }

    count++;
  }

  return count;
};

// '10000' => 16, '01000' => 8
// '11000' => 24, '01100' => 12
var numSteps = function(s) {
  let count = 0;

  while (s.indexOf('1') !== s.length - 1) {
    if (s[s.length - 1] === '1') {
      s = addOne(s);
    } else {
      s = divideByTwo(s);
    }

    count++;
  }

  return count;
}

// '01000' => 16, '01000' => 8
// '01100' => 24, '01100' => 12
// '01101' => 26, '01101' => 13
// '01011' => 22, '01011' => 11
function divideByTwo(binary) {
  return '0' + binary.slice(0, binary.length - 1);
}

  // let foundOne = false;
  // for (let i = 0; i < binary.length; i++) {
  //   if (binary[i] === '1' && !foundOne) {
  //     binary = binary.slice(0, i) + '0' + binary.slice(i + 1);
  //     foundOne = true;
  //   } else if (binary[i] === '0' && foundOne) {
  //     binary = binary.slice(0, i) + '1' + binary.slice(i + 1);
  //     break;
  //   }
  // }

// '1101' => 13, '1110'
// '1011' => 11, '1100' => 12
function addOne(binary) {
  let zeroIndex;
  for (let i = binary.length - 2; i >= 0; i--) {
    if (binary[i] === '0') {
      binary = binary.slice(0, i) + '1' + binary.slice(i + 1);
      zeroIndex = i;
      break;
    }
  }


  if (zeroIndex === undefined) {
    let result = '1';
    for (let i = 0; i < binary.length; i++) result += '0';
    return result;
  } else {
    for (let i = zeroIndex + 1; i < binary.length; i++) {
      binary = binary.slice(0, i) + '0' + binary.slice(i + 1);
    }
  }
 

  return binary;
}

function convertToBase10(num) {
  let result = 0;
  let exponent = 0;

  for (let i = num.length - 1; i >= 0; i--) {
    if (num[i] === '1') {
      result += 2 ** exponent;
    }

    exponent++;
  }

  return result;
}

// Problem 3
/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {string}
 */
var longestDiverseString = function (a, b, c) {
  let result = '';

  while (a > 0 || b > 0 || c > 0) {
    // if ([a, b, c].reduce((count, num) => num === 0 ? count + 1 : count, 0) >= 2) break;
    if (a === 0 && b === 0 && result[result.length - 1] === 'c') {
      break;
    } else if (b === 0 && c === 0 && result[result.length - 1] === 'a') {
      break;
    } else if (c === 0 && a === 0 && result[result.length - 1] === 'b') {
      break;
    }

    if (a >= b && a >= c) {
      result += 'a';
      a--;
      if (a > 0 && result[result.length - 2] !== 'a') {
        result += 'a';
        a--;
      }

      if (b >= c && b > 0) {
        result += 'b';
        b--;
      } else if (c > 0) {
        result += 'c';
        c--;
      }
    } else if (b >= c && b >= a) {
      result += 'b';
      b--;
      if (b > 0 && result[result.length - 2] !== 'b') {
        result += 'b';
        b--;
      }

      if (c >= a && c > 0) {
        result += 'c';
        c--;
      } else if (a > 0) {
        result += 'a';
        a--;
      }
    } else {
      result += 'c';
      c--;
      if (c > 0 && result[result.length - 2] !== 'c') {
        result += 'c';
        c--;
      }

      if (b >= a && b > 0) {
        result += 'b';
        b--;
      } else if (a > 0) {
        result += 'a';
        a--;
      }
    }
  }

  return result;
};

// Problem 4
/**
 * @param {number[]} stoneValue
 * @return {string}
 */
// [1,2,3,7]
/*
                                 [1]                                                [1,2]           [1,2,3]
                [2] (2)             [2,3] (5)           [2,3,7] (12)
        [3]     [3, 7]           [7]          
*/
var stoneGameIII = function (stoneValue) {
  let root = new TreeNode(0, [0], 'Bob', stoneValue);
  TreeNode.cache = {}
  return root.val > root.otherVal ? 'Bob' : root.val === root.otherVal ? 'Tie' : 'Alice'
};

class TreeNode {
  constructor(start, val, person, coins) {
    this.start = start;
    this.coins = coins;
    this.val = val.reduce((sum, num) => sum + num)
    this.person = person;

    if (this.start < this.coins.length) {
      this.buildChildren();
      this.calculate();
    } else {
      this.otherVal = 0;
    }
  }

  calculate() {
    let key = `${this.start}-${this.person}-${this.val}`
    if (TreeNode.cache.hasOwnProperty(key)) {
      const { val, otherVal } = TreeNode.cache[key];
      this.val = val
      this.otherVal = otherVal;
      return;
    }
    if (!this.two) {
      this.val += this.one.otherVal;
      this.otherVal = this.one.val;
    } else if (!this.three) {
      if (this.one.val > this.two.val) {
        this.val += this.one.otherVal;
        this.otherVal = this.one.val;
      } else {
        this.val += this.two.otherVal;
        this.otherVal = this.two.val;
      }
    } else {
      if (this.one.val > this.two.val && this.one.val > this.three.val) {
        this.val += this.one.otherVal;
        this.otherVal = this.one.val;
      } else if (this.two.val > this.one.val && this.two.val > this.three.val) {
        this.val += this.two.otherVal;
        this.otherVal = this.two.val;
      } else {
        this.val += this.three.otherVal;
        this.otherVal = this.three.val;
      }
    }

    TreeNode.cache[key] = {
      val: this.val,
      otherVal: this.otherVal
    }
  }

  buildChildren() {
    let coins = this.coins;
    let otherPerson = this.otherPerson();
    this.one = new TreeNode(this.start + 1, coins.slice(this.start, this.start + 1), otherPerson, coins);
    if (this.start === coins.length - 1) return;
    this.two = new TreeNode(this.start + 2, coins.slice(this.start, this.start + 2), otherPerson, coins);
    if (this.start === coins.length - 2) return;
    this.three = new TreeNode(this.start + 3, coins.slice(this.start, this.start + 3), otherPerson, coins);
  }

  otherPerson() {
    return this.person === 'Alice' ? 'Bob' : 'Alice';
  }
}

TreeNode.cache = {}