/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
var criticalConnections = function (n, connections) {
  let graph = {};

  // build graph
  for (let i = 0; i < connections.length; i++) {
    let [one, two] = connections[i];

    if (!graph[one]) graph[one] = [];
    if (!graph[two]) graph[two] = [];
    graph[one].push(two);
    graph[two].push(one);
  }

  let critical = [];

  for (let i = 0; i < connections.length; i++) {
    let [one, two] = connections[i];
    if (!simultaneousBFS(graph, one, two)) critical.push(connections[i]);
  }

  return critical;
};

function simultaneousBFS(graph, node1, node2) {
  let visited1 = new Set();
  visited1.add(node1);
  let visited2 = new Set();
  visited2.add(node2);

  let queue1 = [node1];
  let queue2 = [node2];

  while (queue1.length && queue2.length) {
    let curr1 = queue1.shift();
    for (let i = 0; i < graph[curr1].length; i++) {
      let neighbor = graph[curr1][i];
      if (curr1 === node1 && neighbor === node2) continue;
      if (visited2.has(neighbor)) return true;
      if (visited1.has(neighbor)) continue;
      queue1.push(neighbor);
      visited1.add(neighbor);
    }

    let curr2 = queue2.shift();
    for (let i = 0; i < graph[curr2].length; i++) {
      let neighbor = graph[curr2][i];
      if (curr2 === node2 && neighbor === node1) continue;
      if (visited1.has(neighbor)) return true;
      if (visited2.has(neighbor)) continue;
      queue2.push(neighbor);
      visited2.add(neighbor);
    }
  }

  return false;
}