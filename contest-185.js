var reformat = function (s) {
  let letters = [];
  let numbers = [];

  for (let i = 0; i < s.length; i++) {
    if (isNaN(parseInt(s[i]))) {
      letters.push(s[i]);
    } else {
      numbers.push(s[i]);
    }
  }

  if (Math.abs(letters.length - numbers.length) > 1) return false;

  let res = ''
  while (letters.length && numbers.length) {
    res += letters.pop();
    res += numbers.pop();
  }

  if (letters.length) res += letters.pop();
  if (numbers.length) res += letters.pop();

  return res;
};

// Problem 2
/**
 * @param {string[][]} orders
 * @return {string[][]}
 */
var displayTable = function (orders) {
  let tablesByFood = {};
  let tables = new Set();

  for (let i = 0; i < orders.length; i++) {
    let [customer, table, food] = orders[i];
    tables.add(table);

    if (!tablesByFood.hasOwnProperty(food)) tablesByFood[food] = {};
    if (!tablesByFood[food].hasOwnProperty(table)) tablesByFood[food][table] = 0;
    tablesByFood[food][table]++;
  }

  let columns = Object.keys(tablesByFood).sort();
  columns.unshift("Table");
  let sortedTables = new Array(...tables).sort((a, b) => parseInt(a) - parseInt(b));
  let res = [];
  res.push(columns);

  for (let i = 0; i < sortedTables.length; i++) {
    let table = sortedTables[i];
    let row = [table];
    for (let j = 1; j < columns.length; j++) {
      let food = columns[j];
      if (tablesByFood[food][table] === undefined) {
        row.push('0');
      } else {
        row.push(tablesByFood[food][table].toString());
      }
    }

    res.push(row);
  }

  return res;
};

// Problem 3
/**
 * @param {string} croakOfFrogs
 * @return {number}
 */
var minNumberOfFrogs = function (croakOfFrogs) {
  let croaks = {
    'c': [],
    'r': [],
    'o': [],
    'a': []
  };

  let prevLetters = {
    'r': 'c',
    'o': 'r',
    'a': 'o',
    'k': 'a'
  }

  let best;

  for (let i = 0; i < croakOfFrogs.length; i++) {
    let letter = croakOfFrogs[i];

    if (letter === 'c') {
      croaks[letter].push([letter]);
    } else {
      let lastLetter = prevLetters[letter];
      let prevCroaks = croaks[lastLetter];
      if (!prevCroaks.length) return -1;
      let myCroak = prevCroaks.pop();
      myCroak.push(letter);
      if (letter !== 'k') croaks[letter].push(myCroak);
    }

    let croakCount = Object.values(croaks).reduce((count, croak) => count + croak.length, 0);
    if (best === undefined || croakCount > best) best = croakCount;
  }

  if (Object.values(croaks).some(croak => croak.length)) return -1;
  return best;
};