/**
 * Conway's Game of Life JavaScript Implementation
 * A simple package for embedding Game of Life visualization in any website
 */

class GameOfLife {
  constructor(container, options = {}) {
    // Default configuration
    this.config = {
      width: options.width || 800,
      height: options.height || 600,
      cellSize: options.cellSize || 10,
      speed: options.speed || 100, // milliseconds between generations
      autoStart: options.autoStart !== false, // default to true
      initialPattern: options.initialPattern || 'random',
      fillColor: options.fillColor || '#000000',
      backgroundColor: options.backgroundColor || '#ffffff',
      borderColor: options.borderColor || '#cccccc',
      ...options
    };

    this.container = container;
    this.isRunning = false;
    this.generation = 0;
    this.intervalId = null;

    // Calculate grid dimensions
    this.cols = Math.floor(this.config.width / this.config.cellSize);
    this.rows = Math.floor(this.config.height / this.config.cellSize);

    // Initialize grid
    this.grid = this.createGrid();
    this.nextGrid = this.createGrid();

    // Setup canvas
    this.setupCanvas();
    
    // Initialize with pattern
    this.initializePattern();
    
    // Auto-start if enabled
    if (this.config.autoStart) {
      this.start();
    }

    // Initial render
    this.render();
  }

  createGrid() {
    return Array(this.rows).fill().map(() => Array(this.cols).fill(0));
  }

  setupCanvas() {
    // Check if we're in a browser environment
    if (typeof document === 'undefined') {
      throw new Error('Game of Life requires a browser environment with DOM support');
    }
    
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.config.width;
    this.canvas.height = this.config.height;
    this.canvas.style.border = `1px solid ${this.config.borderColor}`;
    this.ctx = this.canvas.getContext('2d');
    
    // Clear container and add canvas
    this.container.innerHTML = '';
    this.container.appendChild(this.canvas);

    // Add controls
    this.addControls();
  }

  addControls() {
    // Check if we're in a browser environment
    if (typeof document === 'undefined') {
      return; // Skip adding controls in non-browser environments
    }
    
    const controls = document.createElement('div');
    controls.style.marginTop = '10px';
    
    const startStopBtn = document.createElement('button');
    startStopBtn.textContent = this.isRunning ? 'Stop' : 'Start';
    startStopBtn.onclick = () => this.toggle();
    
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset';
    resetBtn.onclick = () => this.reset();
    
    const generationDisplay = document.createElement('span');
    generationDisplay.style.marginLeft = '20px';
    generationDisplay.id = 'generation-display';
    generationDisplay.textContent = `Generation: ${this.generation}`;
    
    controls.appendChild(startStopBtn);
    controls.appendChild(resetBtn);
    controls.appendChild(generationDisplay);
    
    this.container.appendChild(controls);
    this.startStopBtn = startStopBtn;
    this.generationDisplay = generationDisplay;
  }

  initializePattern() {
    if (this.config.initialPattern === 'random') {
      this.randomPattern();
    } else if (this.config.initialPattern === 'glider') {
      this.gliderPattern();
    } else if (this.config.initialPattern === 'blinker') {
      this.blinkerPattern();
    } else if (Array.isArray(this.config.initialPattern)) {
      this.customPattern(this.config.initialPattern);
    }
  }

  randomPattern() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.grid[row][col] = Math.random() > 0.7 ? 1 : 0;
      }
    }
  }

  gliderPattern() {
    const startRow = Math.floor(this.rows / 4);
    const startCol = Math.floor(this.cols / 4);
    
    // Classic glider pattern
    const glider = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1]
    ];
    
    for (let row = 0; row < glider.length; row++) {
      for (let col = 0; col < glider[row].length; col++) {
        if (startRow + row < this.rows && startCol + col < this.cols) {
          this.grid[startRow + row][startCol + col] = glider[row][col];
        }
      }
    }
  }

  blinkerPattern() {
    const centerRow = Math.floor(this.rows / 2);
    const centerCol = Math.floor(this.cols / 2);
    
    // Vertical blinker
    this.grid[centerRow - 1][centerCol] = 1;
    this.grid[centerRow][centerCol] = 1;
    this.grid[centerRow + 1][centerCol] = 1;
  }

  customPattern(pattern) {
    const startRow = Math.floor((this.rows - pattern.length) / 2);
    const startCol = Math.floor((this.cols - pattern[0].length) / 2);
    
    for (let row = 0; row < pattern.length; row++) {
      for (let col = 0; col < pattern[row].length; col++) {
        if (startRow + row < this.rows && startCol + col < this.cols) {
          this.grid[startRow + row][startCol + col] = pattern[row][col];
        }
      }
    }
  }

  countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        
        const newRow = row + i;
        const newCol = col + j;
        
        if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
          count += this.grid[newRow][newCol];
        }
      }
    }
    return count;
  }

  nextGeneration() {
    // Apply Conway's Game of Life rules
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const neighbors = this.countNeighbors(row, col);
        const currentCell = this.grid[row][col];
        
        if (currentCell === 1) {
          // Live cell
          if (neighbors < 2 || neighbors > 3) {
            this.nextGrid[row][col] = 0; // Dies
          } else {
            this.nextGrid[row][col] = 1; // Survives
          }
        } else {
          // Dead cell
          if (neighbors === 3) {
            this.nextGrid[row][col] = 1; // Born
          } else {
            this.nextGrid[row][col] = 0; // Stays dead
          }
        }
      }
    }
    
    // Swap grids
    [this.grid, this.nextGrid] = [this.nextGrid, this.grid];
    this.generation++;
    
    if (this.generationDisplay) {
      this.generationDisplay.textContent = `Generation: ${this.generation}`;
    }
  }

  render() {
    this.ctx.fillStyle = this.config.backgroundColor;
    this.ctx.fillRect(0, 0, this.config.width, this.config.height);
    
    this.ctx.fillStyle = this.config.fillColor;
    
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col] === 1) {
          this.ctx.fillRect(
            col * this.config.cellSize,
            row * this.config.cellSize,
            this.config.cellSize - 1,
            this.config.cellSize - 1
          );
        }
      }
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        this.nextGeneration();
        this.render();
      }, this.config.speed);
      
      if (this.startStopBtn) {
        this.startStopBtn.textContent = 'Stop';
      }
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.intervalId);
      
      if (this.startStopBtn) {
        this.startStopBtn.textContent = 'Start';
      }
    }
  }

  toggle() {
    if (this.isRunning) {
      this.stop();
    } else {
      this.start();
    }
  }

  reset() {
    this.stop();
    this.generation = 0;
    this.grid = this.createGrid();
    this.initializePattern();
    this.render();
    
    if (this.generationDisplay) {
      this.generationDisplay.textContent = `Generation: ${this.generation}`;
    }
  }

  // Public API method for creating a new instance
  static create(container, options = {}) {
    // Check if we're in a browser environment
    if (typeof document === 'undefined') {
      throw new Error('Game of Life requires a browser environment with DOM support');
    }
    
    if (typeof container === 'string') {
      container = document.getElementById(container);
    }
    
    if (!container) {
      throw new Error('Container element not found');
    }
    
    return new GameOfLife(container, options);
  }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameOfLife;
}

if (typeof window !== 'undefined') {
  window.GameOfLife = GameOfLife;
}