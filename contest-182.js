// Problem 1
/**
 * @param {number[]} arr
 * @return {number}
 */
var findLucky = function(arr) {
  let count = {};

  arr.forEach(el => {
    if (!count.hasOwnProperty(el)) count[el] = 0;
    count[el]++;
  });

  let max;

  Object.keys(count).forEach(num => {
    if (parseInt(num) === count[num]) {
      if (max === undefined || parseInt(num) > max) max = num;
    }
  });

  return max || -1;
};

// Problem 2
/**
 * @param {number[]} rating
 * @return {number}
 */
var numTeams = function(rating) {
    let smaller = {};
    let larger = {};
    let count = 0;

    for (let i = 0; i < rating.length; i++) {
      for (let j = i + 1; j < rating.length; j++) {
        if (rating[j] === rating[i]) continue;
        let dir = (rating[j] > rating[i]) ? 'up' : 'down'

        for (let k = j + 1; k < rating.length; k++) {
          if (rating[k] === rating[j] || rating[k] === rating[i]) continue;
          if (dir === 'up' && rating[k] > rating[j]) count++;
          if (dir === 'down' && rating[k] < rating[j]) count++;
        }
      }
    }

    return count;
};
// Problem 3
var UndergroundSystem = function() {
    this.peeps = {};
    this.averageTimes = {};
};

/** 
 * @param {number} id 
 * @param {string} stationName 
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkIn = function(id, stationName, t) {
    this.peeps[id] = [stationName, t];
};

/** 
 * @param {number} id 
 * @param {string} stationName 
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkOut = function(id, stationName, t) {
    let [startStation, startTime] = this.peeps[id];
    let time = t - startTime;
    let key = `${startStation}-${stationName}`;
    if (!this.averageTimes.hasOwnProperty(key)) {
      this.averageTimes[key] = [time, 1];
    } else {
      let [currAverage, times] = this.averageTimes[key]
      let totalTime = currAverage * times + time;
      this.averageTimes[key] = [totalTime/(times + 1), times + 1];
    };
};

/** 
 * @param {string} startStation 
 * @param {string} endStation
 * @return {number}
 */
UndergroundSystem.prototype.getAverageTime = function(startStation, endStation) {
    let key = `${startStation}-${endStation}`;
    return this.averageTimes[key][0];
};
/** 
 * Your UndergroundSystem object will be instantiated and called as such:
 * var obj = new UndergroundSystem()
 * obj.checkIn(id,stationName,t)
 * obj.checkOut(id,stationName,t)
 * var param_3 = obj.getAverageTime(startStation,endStation)
 */
// Problem 4
/**
 * @param {number} n
 * @param {string} s1
 * @param {string} s2
 * @param {string} evil
 * @return {number}
 */
var findGoodStrings = function(n, s1, s2, evil) {
  let count = 0;

  
}
// var findGoodStrings = function(n, s1, s2, evil) {
//     let count = 0;

//     for (let n = s1.length - 1; n >= 0; n--) {
//       for (let i = s1.length - 1; i >= n; i--) {
//         if (i !== 0 && s1[i-1] < s2[i-1]) {
//           let nextLetter = s1[i];
//           while (nextLetter.charCodeAt(0) < 123) {
//             let string = s1.slice(0, i) + nextLetter + s1.slice(i + 1);
//             if (!string.includes(evil)) count++;
//             nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
//           }
//         } else {
//           let nextLetter = s1[i];
//           let lastCharCode = s2[i].charCodeAt(0);
//           while (nextLetter.charCodeAt(0) <= lastCharCode) {
//             let string = s1.slice(0, i) + nextLetter + s1.slice(i + 1);
//             if (!string.includes(evil)) count++;
//             nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
//           }
//         }
//       }
//     }

//     return count;
// };

