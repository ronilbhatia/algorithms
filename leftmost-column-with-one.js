/**
 * // This is the BinaryMatrix's API interface.
 * // You should not implement it, or speculate about its implementation
 * function BinaryMatrix() {
 *     @param {integer} x, y
 *     @return {integer}
 *     this.get = function(x, y) {
 *         ...
 *     };
 *
 *     @return {[integer, integer]}
 *     this.dimensions = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {BinaryMatrix} binaryMatrix
 * @return {number}
 */
var leftMostColumnWithOne = function (binaryMatrix) {
  let [rows, cols] = binaryMatrix.dimensions();

  let row = 0;
  let earliestOne = -1;

  for (let i = cols - 1; i >= 0, row < rows; i--) {
    if (binaryMatrix.get(row, i) === 1)  {
      earliestOne = i;
    } else {
      row++;
      i++;
    }
  }

  return earliestOne;
};