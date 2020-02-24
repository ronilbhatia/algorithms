var isBipartite = function (graph) {
  let group1 = new Set();
  group1.add(0);
  let group2 = new Set();
  let queue = [[0, group1, group2]];
  let idx = 1;

  while (queue.length) {
    let [curr, group, otherGroup] = queue.shift();
    for (let i = 0; i < graph[curr].length; i++) {
      let dest = graph[curr][i];
      if (group.has(dest)) return false;
      if (otherGroup.has(dest)) continue;
      otherGroup.add(dest);
      queue.push([dest, otherGroup, group]);
    }

    while (!queue.length && idx < graph.length) {
      if (!group1.has(idx) && !group2.has(idx)) queue.push([idx, group1, group2]);
      idx++;
    }
  }

  return true;
};