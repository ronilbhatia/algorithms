/*
Basic Strategy:
Going to cumulatively partition both arrays such that left and right halfs
are at most 1 # of elements apart. Going to check last left side element of each
partition against first right side element of opposite partition. If left side
is less than right side for both we have found the partition we are looking for.
Take max of the last left side elements against min of the first right side
elements. If there are odd number of elements in the Array it's on the side with
more elements and follows the same rule as above depending on which side it is.

1. Keep track of starting and ending index for nums1.
2. Array 1 partition will always be halfway between start and end
3. Array 2 Partition will be ((cumulative length of arrays) + 1 / 2) - Array 1 Partition
4. if Array 1 left < Array 2 right, and Array 2 left < Array 2 right
  a. Calc median between 4 elements as stated above
5. else if Array 1 left < Array 2 right, but Array 2 left > Array 1 right
  a. Move x downwards, recalculate partitions, repeat
6. else
  b. Move x upwards, recalculate partitions, repeat

// Example:
Array 1: [1, 3, 6, |10, 13, 18] Start: 0 End: 5 Partition: 3 (((5 - 0) + 1) / 2)
Array 2: [2, 3, 5, |9, 14, 17] Partition: 3 ((6 + 6 + 1) / 2) - 2)

6 < 9 && 5 < 10 so median is (Math.max(6, 5) + Math.min(10, 9) / 2) = 7.5
*/

var findMedianSortedArrays = function (nums1, nums2) {
  if (!nums1.length) {
    mid = Math.floor(nums2.length / 2);
    return nums2.length % 2 === 0 ? (nums2[mid - 1] + nums2[mid]) / 2 : nums2[mid];
  }
  if (!nums2.length) {
    mid = Math.floor(nums1.length / 2);
    return nums1.length % 2 === 0 ? (nums1[mid - 1] + nums1[mid]) / 2 : nums1[mid];
  }

  let totalLength = nums1.length + nums2.length;
  let start = 0;
  let end = nums1.length;

  while (true) {
    let partition1 = Math.floor((end - start + 1) / 2) + start;
    let partition2 = Math.floor((totalLength) / 2) - partition1;
    
    while (partition2 > nums2.length) {
      partition2--;
      partition1++;
    }

    while (partition2 < 0) {
      partition2++;
      partition1--;
    }

    let x1 = nums1[partition1 - 1];
    if (x1 === undefined) x1 = -Infinity;
    let x2 = nums1[partition1];
    if (x2 === undefined) x2 = Infinity;
    let y1 = nums2[partition2 - 1];
    if (y1 === undefined) y1 = -Infinity;
    let y2 = nums2[partition2];
    if (y2 === undefined) y2 = Infinity;

    if (x1 <= y2 && y1 <= x2) {
      let numRight = (nums1.length - partition1) + (nums2.length - partition2);
      let numLeft = (partition1 + partition2);
      if (totalLength % 2 === 1) {
        return numRight > numLeft ? Math.min(x2, y2) : Math.max(x1, y1);
      }
      return (Math.max(x1, y1) + Math.min(x2, y2)) / 2;
    } else if (x1 < y2) {
      start = partition1;
    } else {
      end = (end === partition1) ? end - 1 : partition1;
    }
  }
}

// [2, 3, 4, |5, 6] 3 - 0 + 1 = 4 / 2 = 2 + 0 = 2
// [|1] 6 / 2 = 3 - 3 = 0

// [1, 2, 3| 4] (4 - 2 + 1) = 2 / 2 = 1 + 3 = 3
// [5, |6, 7, 8]  8 / 2 = 4 - 3 = 1

// [3|]   1 - 1 + 1 = 1 / 2 = 1 + 0 = 1
// [|-2, -1] 3 / 2 = 1 - 1 = 0

// [-2, |-1] 2 - 0 = 2 / 2 = 1 + 0 = 1
// [|3] 3 / 2 = 1 - 1 = 0

// [2|]  2 / 2 = 1
// [|0]  2 / 2 = 1 - 1 = 0

// [1, 2, |3, 4, 5] 5 / 2 = 2
// [1, 2, 3, |4, 5, 6] 11 / 2 = 5 - 2 = 3

// [1, 2, 3, 4,| 10, 11, 12, 13] (7 - 0 + 1) / 2 = 4
// [5,| 6] (10 / 2) - 4 = 1

// [1, 3, 3, |4, 7, 8, 9] (6 - 0 + 1) / 2 = 3
// [2, 2, |4, 4] (11 / 2) - 3 = 2

// [1, 2, |3]   start = 1, end = 2, partition1 = 4 / 2 = 2
// [|4, 5] partition2 = 5 / 2 = 2 - 2 = 0