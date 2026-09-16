// ============================================================
//  OPEN THIS FILE IN VIVA:  app.js
//  index.html = layout only    style.css = colors only
//
//  How this works (say this first):
//  1. ALGOS is just the text on the LEFT + best/avg/worst
//  2. The functions below are the REAL algorithms
//  3. show() colors two boxes and waits, then the loop continues
// ============================================================

function el(id) {
  return document.getElementById(id);
}

function sleep() {
  var ms = 780 - Number(el("speed").value);
  return new Promise(function (done) {
    setTimeout(done, ms);
  });
}

function swap(a, i, j) {
  var t = a[i];
  a[i] = a[j];
  a[j] = t;
}

var arr = [7, 2, 9, 4, 1, 8, 3, 5];
var startArr = arr.slice();
var stop = false;
var playing = false;
var algo = "bubble";

// text on the left + complexity table (not the running code)
var ALGOS = {
  bubble: {
    name: "Bubble Sort",
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    code:
      "function bubbleSort(a) {\n" +
      "  for (let i = 0; i < n; i++) {\n" +
      "    for (let j = 0; j < n-i-1; j++) {\n" +
      "      if (a[j] > a[j+1]) swap(a, j, j+1);\n" +
      "    }\n" +
      "  }\n" +
      "}",
  },
  insertion: {
    name: "Insertion Sort",
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    code:
      "function insertionSort(a) {\n" +
      "  for (let i = 1; i < n; i++) {\n" +
      "    let key = a[i], j = i - 1;\n" +
      "    while (j >= 0 && a[j] > key) {\n" +
      "      a[j + 1] = a[j];\n" +
      "      j--;\n" +
      "    }\n" +
      "    a[j + 1] = key;\n" +
      "  }\n" +
      "}",
  },
  merge: {
    name: "Merge Sort",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    code:
      "function mergeSort(a, l, r) {\n" +
      "  if (l >= r) return;\n" +
      "  const m = Math.floor((l + r) / 2);\n" +
      "  mergeSort(a, l, m);\n" +
      "  mergeSort(a, m + 1, r);\n" +
      "  merge(a, l, m, r);\n" +
      "}",
  },
  quick: {
    name: "Quick Sort",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
    code:
      "function quickSort(a, l, r) {\n" +
      "  if (l >= r) return;\n" +
      "  const p = partition(a, l, r);\n" +
      "  quickSort(a, l, p - 1);\n" +
      "  quickSort(a, p + 1, r);\n" +
      "}",
  },
  radix: {
    name: "Radix Sort",
    best: "O(n·d)",
    avg: "O(n·d)",
    worst: "O(n·d)",
    space: "O(n + k)",
    code:
      "function radixSort(a) {\n" +
      "  for (let exp = 1; max/exp > 0; exp *= 10) {\n" +
      "    put a[i] in bucket (a[i]/exp % 10)\n" +
      "    collect buckets 0..9 back into a\n" +
      "  }\n" +
      "}",
  },
  dijkstra: {
    name: "Dijkstra",
    best: "O(V²)",
    avg: "O(V²)",
    worst: "O(V²)",
    space: "O(V)",
    code:
      "function dijkstra(start) {\n" +
      "  dist[start] = 0\n" +
      "  others = Infinity\n" +
      "  repeat V times:\n" +
      "    u = closest unvisited node\n" +
      "    mark u visited\n" +
      "    for each neighbor v:\n" +
      "      if dist[u]+w < dist[v]\n" +
      "        dist[v] = dist[u]+w\n" +
      "}",
  },
  bfs: {
    name: "BFS",
    best: "O(V + E)",
    avg: "O(V + E)",
    worst: "O(V + E)",
    space: "O(V)",
    code:
      "function bfs(start) {\n" +
      "  queue = [start]\n" +
      "  while queue not empty:\n" +
      "    u = queue.shift()\n" +
      "    for each neighbor v:\n" +
      "      if v not seen: enqueue v\n" +
      "}",
  },
  dfs: {
    name: "DFS",
    best: "O(V + E)",
    avg: "O(V + E)",
    worst: "O(V + E)",
    space: "O(V)",
    code:
      "function dfs(u) {\n" +
      "  seen.add(u)\n" +
      "  for each neighbor v of u:\n" +
      "    if v not seen:\n" +
      "      dfs(v)\n" +
      "}",
  },
};

// graph: 6 nodes, undirected weighted edges
var nodes = [
  ["A", 60, 50],
  ["B", 200, 40],
  ["C", 340, 50],
  ["D", 60, 170],
  ["E", 200, 170],
  ["F", 340, 170],
];
var edges = [
  ["A", "B", 4],
  ["B", "C", 2],
  ["A", "D", 3],
  ["B", "E", 5],
  ["C", "F", 1],
  ["D", "E", 1],
  ["E", "F", 6],
  ["D", "F", 7],
];

function makeAdj() {
  var g = {};
  var i;
  for (i = 0; i < nodes.length; i++) g[nodes[i][0]] = [];
  for (i = 0; i < edges.length; i++) {
    var u = edges[i][0];
    var v = edges[i][1];
    var w = edges[i][2];
    g[u].push([v, w]);
    g[v].push([u, w]);
  }
  return g;
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function setCode(id, line) {
  var lines = ALGOS[id].code.split("\n");
  var pre = el("code");
  var html = "";
  var i;
  for (i = 0; i < lines.length; i++) {
    html += "<div>" + escapeHtml(lines[i] || " ") + "</div>";
  }
  if (pre.innerHTML === "" || pre.getAttribute("data-algo") !== id) {
    pre.setAttribute("data-algo", id);
    pre.innerHTML = html;
  }
  for (i = 0; i < pre.children.length; i++) {
    pre.children[i].className = i === line ? "on" : "";
  }
}

function maxOf(a) {
  var m = a[0];
  var i;
  for (i = 1; i < a.length; i++) if (a[i] > m) m = a[i];
  return m;
}

function boxes(a, i, j, done) {
  var m = maxOf(a);
  var root = el("viz");
  var row = root.querySelector(".bars");
  var k;
  if (!row || row.children.length !== a.length) {
    var html = '<div class="bars">';
    for (k = 0; k < a.length; k++) {
      html += '<div class="box" style="height:' + (24 + (a[k] / m) * 200) + 'px">' + a[k] + "</div>";
    }
    html += "</div>";
    root.innerHTML = html;
    row = root.querySelector(".bars");
  }
  for (k = 0; k < a.length; k++) {
    var box = row.children[k];
    box.style.height = 24 + (a[k] / m) * 200 + "px";
    box.textContent = a[k];
    box.className = "box";
    if (done && done[k]) box.className = "box done";
    else if (k === i) box.className = "box a";
    else if (k === j) box.className = "box b";
  }
}

function graph(cur, seen, pathE, hot) {
  var at = {};
  var i;
  for (i = 0; i < nodes.length; i++) at[nodes[i][0]] = [nodes[i][1], nodes[i][2]];

  var root = el("viz");
  var svg = root.querySelector("svg");
  if (!svg) {
    var s = '<svg viewBox="0 0 420 240">';
    for (i = 0; i < edges.length; i++) {
      var u = edges[i][0];
      var v = edges[i][1];
      var w = edges[i][2];
      var x1 = at[u][0];
      var y1 = at[u][1];
      var x2 = at[v][0];
      var y2 = at[v][1];
      var key = u < v ? u + v : v + u;
      s += '<line class="edge" data-e="' + key + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>';
      s += '<text class="nlabel" x="' + (x1 + x2) / 2 + '" y="' + ((y1 + y2) / 2 - 8) + '">' + w + "</text>";
    }
    for (i = 0; i < nodes.length; i++) {
      var id = nodes[i][0];
      var x = nodes[i][1];
      var y = nodes[i][2];
      s += '<circle class="node" data-n="' + id + '" cx="' + x + '" cy="' + y + '" r="18"/>';
      s += '<text class="nlabel" x="' + x + '" y="' + (y + 4) + '">' + id + "</text>";
    }
    root.innerHTML = s + "</svg>";
    svg = root.querySelector("svg");
  }

  var lines = svg.querySelectorAll(".edge");
  for (i = 0; i < lines.length; i++) {
    var ek = lines[i].getAttribute("data-e");
    var cls = "edge";
    if (pathE && pathE[ek]) cls += " path";
    else if (hot === ek) cls += " hot";
    lines[i].setAttribute("class", cls);
  }
  var circles = svg.querySelectorAll(".node");
  for (i = 0; i < circles.length; i++) {
    var nid = circles[i].getAttribute("data-n");
    var nc = "node";
    if (pathE && nodeOnPath(nid, pathE)) nc += " path";
    else if (nid === cur) nc += " cur";
    else if (seen && seen[nid]) nc += " seen";
    circles[i].setAttribute("class", nc);
  }
}

function nodeOnPath(id, pathE) {
  var k;
  for (k in pathE) {
    if (k.indexOf(id) !== -1) return true;
  }
  return false;
}

function markPath(prev, end) {
  var pathE = {};
  var x = end;
  while (prev[x]) {
    var p = prev[x];
    var key = p < x ? p + x : x + p;
    pathE[key] = true;
    x = p;
  }
  return pathE;
}

async function show(a, i, j, line, text, done) {
  if (stop) throw "stop";
  boxes(a, i, j, done);
  setCode(algo, line);
  el("note").textContent = text || "";
  await sleep();
  if (stop) throw "stop";
}

// ---------------- sorting ----------------

async function bubbleSort(a) {
  var done = {};
  var i, j;
  for (i = 0; i < a.length; i++) {
    for (j = 0; j < a.length - i - 1; j++) {
      await show(a, j, j + 1, 2, "compare " + a[j] + " and " + a[j + 1]);
      if (a[j] > a[j + 1]) {
        swap(a, j, j + 1);
        await show(a, j, j + 1, 3, "swap");
      }
    }
    done[a.length - i - 1] = true;
  }
  await show(a, -1, -1, 4, "done", done);
}

async function insertionSort(a) {
  var i, j, key;
  for (i = 1; i < a.length; i++) {
    key = a[i];
    j = i - 1;
    await show(a, i, j, 1, "insert " + key);
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      await show(a, j, j + 1, 3, "shift " + a[j]);
      j--;
    }
    a[j + 1] = key;
    await show(a, j + 1, -1, 5, "placed " + key);
  }
}

async function merge(a, l, m, r) {
  var left = a.slice(l, m + 1);
  var right = a.slice(m + 1, r + 1);
  var i = 0;
  var j = 0;
  var k = l;
  while (i < left.length && j < right.length) {
    await show(a, l + i, m + 1 + j, 5, "merge " + left[i] + " / " + right[j]);
    if (left[i] <= right[j]) {
      a[k] = left[i];
      i++;
    } else {
      a[k] = right[j];
      j++;
    }
    k++;
  }
  while (i < left.length) {
    a[k] = left[i];
    i++;
    k++;
  }
  while (j < right.length) {
    a[k] = right[j];
    j++;
    k++;
  }
  await show(a, l, r, 5, "merged " + l + ".." + r);
}

async function mergeSort(a, l, r) {
  if (l >= r) return;
  var m = Math.floor((l + r) / 2);
  await show(a, l, r, 2, "split " + l + ".." + r);
  await mergeSort(a, l, m);
  await mergeSort(a, m + 1, r);
  await merge(a, l, m, r);
}

async function partition(a, l, r) {
  var pivot = a[r];
  var i = l;
  var j;
  for (j = l; j < r; j++) {
    await show(a, j, r, 2, a[j] + " vs pivot " + pivot);
    if (a[j] < pivot) {
      swap(a, i, j);
      i++;
    }
  }
  swap(a, i, r);
  await show(a, i, r, 2, "pivot at " + i);
  return i;
}

async function quickSort(a, l, r) {
  if (l >= r) return;
  var p = await partition(a, l, r);
  await quickSort(a, l, p - 1);
  await quickSort(a, p + 1, r);
}

async function radixSort(a) {
  var max = maxOf(a);
  var exp;
  for (exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    var buckets = [[], [], [], [], [], [], [], [], [], []];
    var i;
    for (i = 0; i < a.length; i++) {
      var d = Math.floor(a[i] / exp) % 10;
      buckets[d].push(a[i]);
      await show(a, i, -1, 2, a[i] + " -> bucket " + d);
    }
    var k = 0;
    var b;
    for (b = 0; b < 10; b++) {
      for (i = 0; i < buckets[b].length; i++) {
        a[k] = buckets[b][i];
        k++;
      }
    }
    await show(a, -1, -1, 3, exp === 1 ? "sorted by ones" : "sorted by tens");
  }
}

// ---------------- graphs ----------------

async function dijkstraRun() {
  var g = makeAdj();
  var dist = {};
  var prev = {};
  var seen = {};
  var i;
  for (i = 0; i < nodes.length; i++) dist[nodes[i][0]] = Infinity;
  dist.A = 0;

  var visited = 0;
  while (visited < nodes.length) {
    var u = null;
    for (i = 0; i < nodes.length; i++) {
      var n = nodes[i][0];
      if (!seen[n] && (u === null || dist[n] < dist[u])) u = n;
    }
    seen[u] = true;
    visited++;
    graph(u, seen);
    setCode("dijkstra", 3);
    el("note").textContent = "pick " + u + "  dist=" + dist[u];
    await sleep();
    if (stop) throw "stop";

    var nbr = g[u];
    for (i = 0; i < nbr.length; i++) {
      var v = nbr[i][0];
      var w = nbr[i][1];
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        prev[v] = u;
      }
    }
  }
  graph(null, seen, markPath(prev, "F"));
  el("note").textContent = "A -> F distance " + dist.F;
}

async function bfsRun() {
  var g = makeAdj();
  var seen = { A: true };
  var prev = {};
  var q = ["A"];
  while (q.length > 0) {
    var u = q.shift();
    graph(u, seen);
    setCode("bfs", 2);
    el("note").textContent = "visit " + u + "  queue " + q.join(" ");
    await sleep();
    if (stop) throw "stop";
    var nbr = g[u];
    var i;
    for (i = 0; i < nbr.length; i++) {
      var v = nbr[i][0];
      if (!seen[v]) {
        seen[v] = true;
        prev[v] = u;
        q.push(v);
      }
    }
  }
  graph(null, seen, markPath(prev, "F"));
  el("note").textContent = "BFS path A -> F (fewest edges)";
}

async function dfsRun() {
  var g = makeAdj();
  var seen = {};
  var prev = {};

  async function visit(u) {
    seen[u] = true;
    graph(u, seen);
    setCode("dfs", 1);
    el("note").textContent = "visit " + u;
    await sleep();
    if (stop) throw "stop";
    var nbr = g[u];
    var i;
    for (i = 0; i < nbr.length; i++) {
      var v = nbr[i][0];
      if (!seen[v]) {
        prev[v] = u;
        await visit(v);
      }
    }
  }

  await visit("A");
  graph(null, seen, markPath(prev, "F"));
  el("note").textContent = "DFS path A -> F";
}

// ---------------- buttons ----------------

function setMeta(id) {
  var a = ALGOS[id];
  el("name").textContent = a.name;
  el("best").textContent = a.best;
  el("avg").textContent = a.avg;
  el("worst").textContent = a.worst;
  el("space").textContent = a.space;
  setCode(id, -1);
  var buttons = document.querySelectorAll("header button");
  var i;
  for (i = 0; i < buttons.length; i++) {
    buttons[i].className = buttons[i].getAttribute("data-id") === id ? "on" : "";
  }
}

function drawIdle() {
  if (algo === "dijkstra" || algo === "bfs" || algo === "dfs") {
    graph(null, null);
    el("note").textContent = "start A, target F";
  } else {
    boxes(arr, -1, -1);
    el("note").textContent = "";
  }
}

async function run() {
  stop = false;
  playing = true;
  el("play").textContent = "Pause";
  var a = arr.slice();
  try {
    if (algo === "bubble") await bubbleSort(a);
    if (algo === "insertion") await insertionSort(a);
    if (algo === "merge") await mergeSort(a, 0, a.length - 1);
    if (algo === "quick") await quickSort(a, 0, a.length - 1);
    if (algo === "radix") await radixSort(a);
    if (algo === "dijkstra") await dijkstraRun();
    if (algo === "bfs") await bfsRun();
    if (algo === "dfs") await dfsRun();
  } catch (e) {
    if (e !== "stop") throw e;
  }
  playing = false;
  el("play").textContent = "Play";
}

function pick(id) {
  stop = true;
  algo = id;
  arr = startArr.slice();
  setMeta(id);
  drawIdle();
}

el("play").onclick = function () {
  if (playing) {
    stop = true;
    return;
  }
  run();
};

el("reset").onclick = function () {
  stop = true;
  arr = startArr.slice();
  drawIdle();
  setCode(algo, -1);
};

el("shuffle").onclick = function () {
  stop = true;
  var i;
  arr = [];
  for (i = 0; i < 8; i++) arr.push(1 + Math.floor(Math.random() * 99));
  startArr = arr.slice();
  drawIdle();
};

var tabs = document.querySelectorAll("header button");
var t;
for (t = 0; t < tabs.length; t++) {
  tabs[t].onclick = function () {
    pick(this.getAttribute("data-id"));
  };
}

setMeta("bubble");
drawIdle();
