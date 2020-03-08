/**
 * Initialize your data structure here.
 */
var Trie = function () {
  this.start = {};
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  if (!this.start[word[0]]) this.start[word[0]] = {};
  let curr = this.start[word[0]];
  for (let i = 1; i < word.length; i++) {
    if (!curr[word[i]]) curr[word[i]] = {};
    curr = curr[word[i]];
  }

  curr['*'] = true;
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  if (!this.start[word[0]]) return false;

  let curr = this.start[word[0]];
  for (let i = 1; i < word.length; i++) {
    if (!curr[word[i]]) return false;
    curr = curr[word[i]];
  }

  return curr.hasOwnProperty('*');
};

// Alternative solution by Angela to make search take in a bool and work with 
// prefix finding as well
Trie.prototype.search = function (word, bool) {
  if (!this.start[word[0]]) return false;

  let curr = this.start[word[0]];
  for (let i = 1; i < word.length; i++) {
    if (!curr[word[i]]) return false;
    curr = curr[word[i]];
  }

  return bool || curr.hasOwnProperty('*');
};


/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (word) {
    if (!this.start[word[0]]) return false;

    let curr = this.start[word[0]];
    for (let i = 1; i < word.length; i++) {
      if (!curr[word[i]]) return false;
      curr = curr[word[i]];
    }

    return true;
}

// Alternative solution by Angela
Trie.prototype.startsWith = function (word) {
  return this.search(word, true)
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */