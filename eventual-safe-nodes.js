/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function (graph) {
  const result = [];

  for (let i = 0; i < graph.length; i++) {
    let res = tracePath(graph, i, result);
    if (res) result.push(i);
  }

  return result;
};

function tracePath(graph, node, result, visited = new Array(graph.length)) {
  if (result[node]) return result[node];
  if (visited[node]) {
    result[node] = false;
    return false;
  };
  visited[node] = true;

  for (let i = 0; i < graph[node].length; i++) {
    let next = graph[node][i];
    if ()
    let res = tracePath(graph, next, result, visited);
    visited[next] = false;
    if (!res) {
      result[node] = false;
      return false;
    };
  }

  result[node] = true;
  return true;
}