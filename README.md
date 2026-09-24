# DAA Visualizer [Live Demo](https://algo-visulaizer.pages.dev/)

A lightweight, in-browser visualizer for classic algorithms taught in a Design & Analysis of Algorithms (DAA) course. Watch sorting algorithms sort and graph algorithms traverse, step by step, with the underlying pseudocode highlighted in sync.

No frameworks, no build step — just HTML, CSS, and vanilla JavaScript.

## Features

- **5 sorting algorithms** — Bubble, Insertion, Merge, Quick, Radix
- **3 graph algorithms** — Dijkstra, BFS, DFS (on a fixed 6-node weighted graph, A → F)
- **Synced pseudocode panel** — the active line highlights as the algorithm runs
- **Live complexity table** — best / average / worst / space shown for the selected algorithm
- **Playback controls** — play/pause, reset, adjustable speed, and "New data" to shuffle a fresh random array
- **Step narration** — a short note under the visualization explains what's happening at each step (e.g. "compare 7 and 2", "pivot at 3")

## Getting started

No installation or dependencies required.

1. Clone or download this repo
2. Open `index.html` in any modern browser

That's it — everything runs client-side.

```bash
git clone https://github.com/Shrujal00/algo-visulaizer.git
cd algo-visulaizer
open index.html   # or just double-click the file
```

## Usage

1. Pick an algorithm from the header tabs
2. Hit **Play** to run it — bars animate for sorting algorithms, the graph highlights nodes/edges for traversal algorithms
3. Use the **speed** slider to slow down or speed up the animation
4. Hit **New data** to generate a fresh random array (sorting algorithms only)
5. Hit **Reset** to restore the original array/graph state at any point

## Project structure

```
algo-visulaizer/
├── index.html   # page layout and structure only
├── style.css    # all styling / colors
├── app.js       # algorithm implementations + visualization logic
└── img/         # contributor avatars
```

`app.js` is the file to read if you want to understand how it works — `index.html` only defines layout, and `style.css` only defines colors. Each algorithm has:
- A pseudocode string + complexity metadata (in the `ALGOS` object) shown in the UI
- A real, working async implementation (e.g. `bubbleSort`, `dijkstraRun`) that mutates the array/graph state and calls `show()` to render each step and pause before continuing

## Algorithms included

| Algorithm | Best | Average | Worst | Space |
|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Radix Sort | O(n·d) | O(n·d) | O(n·d) | O(n + k) |
| Dijkstra | O(V²) | O(V²) | O(V²) | O(V) |
| BFS | O(V + E) | O(V + E) | O(V + E) | O(V) |
| DFS | O(V + E) | O(V + E) | O(V + E) | O(V) |

## Tech stack

Vanilla JavaScript (ES2017+ async/await), HTML5, and CSS — no external libraries or build tooling.

## Contributors

- **Shrujal Ganatra** — [LinkedIn](https://www.linkedin.com/in/shrujal-ganatra/) · [GitHub](https://github.com/Shrujal00)
- **Meet Malaviya** — [LinkedIn](https://www.linkedin.com/in/meet-malaviya01/) · [GitHub](https://github.com/macyman1)
