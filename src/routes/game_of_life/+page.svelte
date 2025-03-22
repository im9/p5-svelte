<script lang="ts">
  import P5Sketch from 'p5-svelte';
  import type { p5 as p5Type } from 'p5-svelte';

  let cellSize = 20;
  let columnCount: number;
  let rowCount: number;
  let currentCells: any[] = [];
  let nextCells: any[] = [];

  const sketch = (p5: p5Type) => {
    p5.setup = () => {
      p5.frameRate(10);
      p5.createCanvas(window.innerWidth, window.innerHeight);
      columnCount = Math.floor(p5.width / cellSize);
      rowCount = Math.floor(p5.height / cellSize);
      for (let i = 0; i < columnCount; i++) {
        currentCells[i] = [];
      }
      for (let i = 0; i < columnCount; i++) {
        nextCells[i] = [];
      }
      p5.noLoop();
      p5.describe(
        "Grid of squares that switch between white and black, demonstrating a simulation of John Conway's Game of Life. When clicked, the simulation resets."
      );
    };

    p5.draw = () => {
      generate();
      for (let column = 0; column < columnCount; column++) {
        for (let row = 0; row < rowCount; row++) {
          // Get cell value (0 or 1)
          let cell = currentCells[column][row];

          // Convert cell value to get black (0) for alive or white (255 (white) for dead
          p5.fill((1 - cell) * 255);
          p5.stroke(0);
          p5.rect(column * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    };

    // Reset board when mouse is pressed
    p5.mousePressed = () => {
      randomizeBoard();
      p5.loop();
    }

    // Fill board randomly
    function randomizeBoard() {
      for (let column = 0; column < columnCount; column++) {
        for (let row = 0; row < rowCount; row++) {
          // Randomly select value of either 0 (dead) or 1 (alive)
          currentCells[column][row] = p5.random([0, 1]);
        }
      }
    }

    // Create a new generation
    function generate() {
      // Loop through every spot in our 2D array and count living neighbors
      for (let column = 0; column < columnCount; column++) {
        for (let row = 0; row < rowCount; row++) {
          // Column left of current cell
          // if column is at left edge, use modulus to wrap to right edge
          let left = (column - 1 + columnCount) % columnCount;

          // Column right of current cell
          // if column is at right edge, use modulus to wrap to left edge
          let right = (column + 1) % columnCount;

          // Row above current cell
          // if row is at top edge, use modulus to wrap to bottom edge
          let above = (row - 1 + rowCount) % rowCount;

          // Row below current cell
          // if row is at bottom edge, use modulus to wrap to top edge
          let below = (row + 1) % rowCount;

          // Count living neighbors surrounding current cell
          let neighbours =
            currentCells[left][above] +
            currentCells[column][above] +
            currentCells[right][above] +
            currentCells[left][row] +
            currentCells[right][row] +
            currentCells[left][below] +
            currentCells[column][below] +
            currentCells[right][below];

          // Rules of Life
          // 1. Any live cell with fewer than two live neighbours dies
          // 2. Any live cell with more than three live neighbours dies
          if (neighbours < 2 || neighbours > 3) {
            nextCells[column][row] = 0;
            // 4. Any dead cell with exactly three live neighbours will come to life.
          } else if (neighbours === 3) {
            nextCells[column][row] = 1;
            // 3. Any live cell with two or three live neighbours lives, unchanged, to the next generation.
          } else nextCells[column][row] = currentCells[column][row];
        }
      }
      // Swap the current and next arrays for next generation
      let temp = currentCells;
      currentCells = nextCells;
      nextCells = temp;
    }

  };
</script>

<div id="p5div" data-wails-no-drag>
  <P5Sketch {sketch} />
</div>

<style>
#p5div {
	margin: 0;
}
</style>
