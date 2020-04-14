/**
 * @param {number[]} prices
 * @return {number}
 */
// Method 2
var maxProfit = function (prices) {
  let profit = 0;
  let buy = prices[0];

  for (let i = 1; i < prices.length; i++) {
    let price = prices[i];

    if (price > buy) profit += price - buy;
    buy = price;
  }

  return profit;
}

// Method 1
var maxProfit = function (prices) {
  let buy = prices[0];
  let sell;
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    let price = prices[i];

    if (price < buy || price < sell) {
      if (sell) profit += sell - buy;
      buy = price;
      sell = null;
    } else if (!sell || price > sell) {
      sell = price;
    }
  }

  if (sell) profit += sell - buy;

  return profit;
};