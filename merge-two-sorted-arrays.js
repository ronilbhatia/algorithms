var merge = function(nums1, m, nums2, n) {
  let p = nums1.length - 1;
  let i = m - 1;
  let j = n - 1;

  while (j > 0) {
    if (nums2[j] > (nums1[i] || 0)) {
      nums1[p] = nums2[j];
      j--;
      p--;
    } else {
      nums1[p] = nums1[i];
      nums1[i] = 0;
      i--;
      p--;
    }
  }

  return nums1;
}