/**
 * @param {number} n
 * @return {string}
 */
var generateTheString = function (n) {
  let res = '';
  if (n % 2 == 0) {
    while (n > 1) {
      res += 'a'
      n--;
    }

    res += 'b';
  } else {
    while (n > 0) {
      res += 'a';
      n--;
    }
  }

  return res;
};

/**
 * @param {number[]} light
 * @return {number}
 */
var numTimesAllBlue = function (light) {
  let dp = new Array(light.length).fill(0);
  let litMoments = 0;
  // light.forEach(lit => {
  //   if (lit === 1) {
  //     dp[0] = 2;
  //     let i = 1;

  //     while (dp[i] === 1) {
  //       dp[i] = 2;
  //       i++;
  //     }
  //   } else if (dp[lit - 2] === 2) {
  //     dp[lit-1] = 2;
  //     litMoments++;
  //   } else {
  //     dp[lit] = 1;
  //     for (let i = lit + 1;)
  //   }
  // });

  for (let i = 0; i < light.length; i++) {
    let lit = light[i];
    if (lit === 1) {
      dp[0] = 2;
      let i = 1;

      while (dp[i] === 1) {
        dp[i] = 2;
        i++;
      }
    } else {
      dp[lit-1] = dp[lit-2] === 2 ? 2 : 1;
      if (dp[lit-2] === 2) {
        dp[lit-1] = 2;
        let i = lit;
  
        while (dp[i] === 1) {
          dp[i] = 2;
          i++;
        }
      }
    }

    if (dp.every(lit => lit !== 1)) litMoments++;
  }

  return litMoments;
};

/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function (n, headID, manager, informTime) {
  let tree = buildTree(headID, manager, informTime);
  return longestTime(tree);
};

var Node = function(val) {
  this.val = val;
  this.children = [];
}

function buildTree(headID, manager, informTime) {
  let root = new Node(informTime[headID]);
  let nodes = { [headID]: root };

  manager.forEach((man, empl) => {
    if (man === -1) return;
    if (!nodes[man]) nodes[man] = new Node(informTime[man]);
    if (!nodes[empl]) nodes[empl] = new Node(informTime[empl]);
    nodes[man].children.push(nodes[empl]);
  })

  return root;
}

function longestTime(node) {
  if (node.children.length === 0) return 0;

  let longest = -Infinity;

  node.children.forEach(child => {
    let result = longestTime(child);
    if (result > longest) longest = result;
  });

  return longest + node.val;
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} t
 * @param {number} target
 * @return {number}
 */
var frogPosition = function (n, edges, t, target) {
  let nodes = buildTree(edges);
  let targetNode = nodes[target];
  let startNode = nodes[1];
  let probability = 1;
  let path1 = findShortestPath(startNode, targetNode);
  let path2 = findShortestPath(targetNode, startNode);
  if ((path1.length === 0 && path2.length === 0) || t < path.length - 1) return 0;

  let path = (path1.length < path2.length) ? path1 : path2;
  let curr = 0;

  while (curr < path.length - 1) {
    probability /= path[curr].children.length;
    curr++;
  }

  // let parent = nodes[target].parent;

  // while (parent) {
  //   t--;
  //   if (t < 0) return 0;

  //   probability /= parent.children.length;
  //   parent = parent.parent;
  // }

  return probability;
};


function buildTree(edges) {
  let nodes = {};

  edges.forEach((edge) => {
    let [from, to] = edge;
    if (!nodes[from]) nodes[from] = new Node(from);
    if (!nodes[to]) nodes[to] = new Node(to);
    nodes[from].children.push(nodes[to]);
    nodes[to].parents.push(nodes[from]);
  })

  return nodes;
}

function findShortestPath(start, end) {
  let startQueue = [start];
  let endQueue = [end];
  let startPaths = { [start.val]: [] };
  let endPaths = { [end.val]: [] };

  while (startQueue.length && endQueue.length) {
    let nextStart = [];
    for (let i = 0; i < startQueue.length; i++) {
      let node = startQueue[i];
      for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];
        if (endPaths[child.val]) {
          // found path, return path;
          return startPaths[node.val].concat(node).concat(child).concat(endPaths[child.val].reverse());
        } else if (!startPaths[child.val]) {
          let nodePath = startPaths[node.val].slice();
          nodePath.push(node);
          startPaths[child.val] = nodePath;
          nextStart.push(child);
        }
      };
    }
    startQueue = nextStart;

    let nextEnd = [];
    for (let i = 0; i < endQueue.length; i++) {
      let node = endQueue[i];
      for (let i = 0; i < node.parents.length; i++) {
        let child = node.parents[i];
        if (startPaths[child.val]) {
          return startPaths[child.val].concat(child).concat(node).concat(endPaths[node.val].reverse());
        } else if (!endPaths[child.val]) {
          let nodePath = endPaths[node.val].slice();
          nodePath.push(node);
          endPaths[child.val] = nodePath;
          nextEnd.push(child);
        }
      };
    }

    endQueue = nextEnd;
  }

  return [];
}

var Node = function (val) {
  this.val = val;
  this.children = [];
  this.parents = [];
}

/*
8
[[2,1],[3,2],[4,1],[5,1],[6,4],[7,1],[8,7]]
7
7
*/
