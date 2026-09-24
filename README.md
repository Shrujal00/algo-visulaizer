# DAA Visualizer

> **Interactive algorithm visualization for Design & Analysis of Algorithms — built with pure HTML, CSS, and JavaScript.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Visualizer-2563eb?style=for-the-badge)](https://algo-visulaizer.pages.dev/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-18181b?style=for-the-badge&logo=github)](https://github.com/Shrujal00/algo-visulaizer)

DAA Visualizer is a lightweight, browser-based tool for learning classic **sorting and graph algorithms** through step-by-step animations.

Watch algorithms execute visually while the corresponding **pseudocode is highlighted in sync**, complexity information is displayed alongside the visualization, and each step is explained with short narration.

**No frameworks. No dependencies. No build step. Just open the HTML file and run.**

---

## Live Demo

### [→ Open DAA Visualizer](https://algo-visulaizer.pages.dev/)

Everything runs directly in the browser. No installation or backend is required.

---

## Features

### Sorting Algorithms

Visualize five classic sorting algorithms with animated array operations:

- **Bubble Sort**
- **Insertion Sort**
- **Merge Sort**
- **Quick Sort**
- **Radix Sort**

### Graph Algorithms

Explore graph traversal and shortest-path algorithms on a fixed **6-node weighted graph (A → F)**:

- **Dijkstra's Algorithm**
- **Breadth-First Search (BFS)**
- **Depth-First Search (DFS)**

### Synchronized Pseudocode

The algorithm's pseudocode is displayed beside the visualization, with the **currently executing line highlighted** as the algorithm progresses.

This makes it easier to connect:

**Code → Operation → Visual Result**

### Complexity Analysis

A live complexity panel displays:

| Algorithm | Best | Average | Worst | Space |
|---|---:|---:|---:|---:|
| Bubble Sort | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` |
| Insertion Sort | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` |
| Merge Sort | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(n)` |
| Quick Sort | `O(n log n)` | `O(n log n)` | `O(n²)` | `O(log n)` |
| Radix Sort | `O(n·d)` | `O(n·d)` | `O(n·d)` | `O(n + k)` |
| Dijkstra | `O(V²)` | `O(V²)` | `O(V²)` | `O(V)` |
| BFS | `O(V + E)` | `O(V + E)` | `O(V + E)` | `O(V)` |
| DFS | `O(V + E)` | `O(V + E)` | `O(V + E)` | `O(V)` |

> **Note:** The Dijkstra implementation uses the straightforward adjacency-matrix / linear-selection approach, hence `O(V²)` complexity.

### Playback Controls

Control the visualization while the algorithm runs:

- ▶ **Play**
- ⏸ **Pause**
- ↻ **Reset**
- ⚡ **Adjustable speed**
- 🎲 **New Data**

### Step Narration

Each visualization step includes a short explanation of what is happening.

Examples:

> `Compare 7 and 2`

> `Swap 7 and 2`

> `Pivot at 3`

> `Visit node C`

This provides additional context while watching the algorithm execute.

---

## How It Works

Each algorithm consists of three main parts:

```text
Algorithm
   │
   ├── Pseudocode
   │
   ├── Complexity Metadata
   │
   └── Async Implementation
            │
            ▼
        Visualization
            │
            ├── Update state
            ├── Highlight pseudocode
            ├── Show narration
            └── Pause
```

The actual implementations are asynchronous functions that mutate the current visualization state and call `show()` after important operations.

For example:

```javascript
async function bubbleSort() {
    // algorithm logic

    await show({
        line: 3,
        message: "Compare 7 and 2"
    });

    // continue execution
}
```

This allows the algorithm's **execution, pseudocode, narration, and visualization** to remain synchronized.

---

## Getting Started

There are **no dependencies or installation steps**.

### 1. Clone the repository

```bash
git clone https://github.com/Shrujal00/algo-visulaizer.git
```

### 2. Enter the project

```bash
cd algo-visulaizer
```

### 3. Open the application

Simply open:

```text
index.html
```

You can double-click the file or use your browser's file opener.

That's it.

---

## Usage

### 1. Choose an Algorithm

Select an algorithm from the navigation tabs.

### 2. Start Visualization

Click **Play** to begin the animation.

- Sorting algorithms animate array elements as bars.
- Graph algorithms highlight nodes and edges during traversal.

### 3. Adjust Speed

Use the **speed slider** to control how quickly the algorithm executes.

Slow it down when studying individual operations or speed it up when reviewing the overall algorithm.

### 4. Generate New Data

For sorting algorithms, click **New Data** to generate a fresh random array.

### 5. Reset

Click **Reset** at any point to restore the initial array or graph state.

---

## Project Structure

```text
algo-visulaizer/
│
├── index.html
│   └── Page structure and layout
│
├── style.css
│   └── Styling and visual design
│
├── app.js
│   └── Algorithm implementations
│       + Visualization logic
│       + State management
│
└── img/
    └── Contributor avatars
```

### Where to Start

If you want to understand how the project works, start with:

```text
app.js
```

`index.html` primarily defines the page structure, while `style.css` contains the visual styling.

The main logic lives inside `app.js`.

Each algorithm has:

1. **Pseudocode**
2. **Complexity metadata**
3. **Algorithm implementation**
4. **Visualization state updates**
5. **Step narration**

The algorithm metadata is organized through the `ALGOS` object, while the actual implementations include functions such as:

```text
bubbleSort()
insertionSort()
mergeSort()
quickSort()
radixSort()

dijkstraRun()
bfsRun()
dfsRun()
```

---

## Algorithms

### Sorting

| Algorithm | Best | Average | Worst | Space |
|---|---:|---:|---:|---:|
| Bubble Sort | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` |
| Insertion Sort | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` |
| Merge Sort | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(n)` |
| Quick Sort | `O(n log n)` | `O(n log n)` | `O(n²)` | `O(log n)` |
| Radix Sort | `O(n·d)` | `O(n·d)` | `O(n·d)` | `O(n + k)` |

### Graph

| Algorithm | Time Complexity | Space |
|---|---:|---:|
| Dijkstra | `O(V²)` | `O(V)` |
| BFS | `O(V + E)` | `O(V)` |
| DFS | `O(V + E)` | `O(V)` |

---

## Tech Stack

Built entirely with native web technologies.

| Technology | Purpose |
|---|---|
| **HTML5** | Structure & layout |
| **CSS3** | Styling & visualization |
| **JavaScript ES2017+** | Algorithms & application logic |
| **Async / Await** | Step-by-step algorithm execution |

### No External Dependencies

```text
✓ No React
✓ No Vue
✓ No Angular
✓ No npm
✓ No bundler
✓ No external libraries
✓ No backend
```

Just:

```text
HTML + CSS + JavaScript
```

---

## Design Philosophy

The project is intentionally kept lightweight.

Instead of abstracting the algorithms behind frameworks or visualization libraries, the implementation exposes the actual algorithmic logic directly in JavaScript.

The goal is to make it possible for a student to:

```text
Read the algorithm
       ↓
See the pseudocode
       ↓
Watch the execution
       ↓
Understand each operation
       ↓
Study the complexity
```

---

## Contributing

Contributions are welcome.

If you want to improve the visualizer, some potential additions include:

- More sorting algorithms
- More graph algorithms
- Interactive graph creation
- Custom array input
- Heap visualizations
- Tree algorithms
- Algorithm comparison mode
- Operation counters
- Interactive complexity graphs
- Mobile-specific improvements

### Development

Because there is no build system, development is straightforward:

```bash
git clone https://github.com/Shrujal00/algo-visulaizer.git
cd algo-visulaizer
```

Then open `index.html` in a browser.

---

## Contributors

### Shrujal Ganatra

[LinkedIn](https://www.linkedin.com/in/shrujal-ganatra/) · [GitHub](https://github.com/Shrujal00)

### Meet Malaviya

[LinkedIn](https://www.linkedin.com/in/meet-malaviya01/) · [GitHub](https://github.com/macyman1)

---

## License

This project is intended for educational purposes and experimentation with algorithm visualization.

---

<div align="center">

**Built to make algorithms easier to see, understand, and remember.**

[**Live Demo →**](https://algo-visulaizer.pages.dev/)

</div>
