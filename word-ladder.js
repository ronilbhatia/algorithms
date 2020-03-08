/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */

// Bidirectional BFS
var ladderLength = function (beginWord, endWord, wordList) {
  let words = new Set(wordList);
  if (!words.has(endWord)) return 0;

  let startQueue = [beginWord];
  let endQueue = [endWord];

  let startWords = { [beginWord]: 1 };
  let endWords = { [endWord]: 1 };

  while (startQueue.length || endQueue.length) {
    let nextStart = [];
    
    for (let i = 0; i < startQueue.length; i++) {
      let [currWord, count] = [startQueue[i], startWords[startQueue[i]]];
      let nextWords = findAdjacentWords(currWord, startWords, words);

      for (let i = 0; i < nextWords.length; i++) {
        let word = nextWords[i];
        if (endWords.hasOwnProperty(word)) return endWords[word] + count;
        startWords[word] = count + 1;
        nextStart.push(word);
      }
    }

    startQueue = nextStart;

    let nextEnd = [];

    for (let i = 0; i < endQueue.length; i++) {
      let [currWord, count] = [endQueue[i], endWords[endQueue[i]]];
      let nextWords = findAdjacentWords(currWord, endWords, words);

      for (let i = 0; i < nextWords.length; i++) {
        let word = nextWords[i];
        if (startWords.hasOwnProperty(word)) return startWords[word] + count;
        endWords[word] = count + 1;
        nextEnd.push(word);
      }
    }

    endQueue = nextEnd;
  }

  return 0;
};

function findAdjacentWords(word, wordsHash, words) {
  let nextWords = [];
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < word.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      let newWord = word.slice(0, i) + alphabet[j] + word.slice(i + 1);
      if (words.has(newWord) && !wordsHash.hasOwnProperty(newWord)) {
        nextWords.push(newWord);
      }
    }
  }

  return nextWords;
}

// Unidirectional BFS (start -> end)
// Approach 1 - create consideredWords set
var ladderLength = function (beginWord, endWord, wordList) {
  let words = new Set(wordList);
  let consideredWords = new Set(beginWord);
  let queue = [[beginWord, 1]];

  while (queue.length) {
    let [currWord, count] = queue.shift();
    if (currWord === endWord) return count;
    let nextWords = findAdjacentWords(currWord, consideredWords, words);
    for (let i = 0; i < nextWords.length; i++) {
      if (nextWords[i] === endWord) return count + 1;
      queue.push([nextWords[i], count + 1]);
    }
  }

  return 0;
};

function findAdjacentWords(word, consideredWords, words) {
  let nextWords = [];
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < word.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      let newWord = word.slice(0, i) + alphabet[j] + word.slice(i+1);
      if (words.has(newWord) && !consideredWords.has(newWord)) {
        nextWords.push(newWord);
        consideredWords.add(newWord);
      }
    }
  }

  return nextWords;
}

// Approach 2 - remove words from set instead of creating separate set
var ladderLength = function (beginWord, endWord, wordList) {
  let words = new Set(wordList);
  let queue = [[beginWord, 1]];

  while (queue.length) {
    let [currWord, count] = queue.shift();
    if (currWord === endWord) return count;
    let nextWords = findAdjacentWords(currWord, words);
    for (let i = 0; i < nextWords.length; i++) {
      if (nextWords[i] === endWord) return count + 1;
      queue.push([nextWords[i], count + 1]);
    }
  }

  return 0;
};

function findAdjacentWords(word, words) {
  let nextWords = [];
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < word.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      let newWord = word.slice(0, i) + alphabet[j] + word.slice(i + 1);
      if (words.has(newWord)) {
        nextWords.push(newWord);
        words.delete(newWord);
      }
    }
  }

  return nextWords;
}