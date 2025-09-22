# game-of-life-js

Conway's Game of Life - A simple JavaScript package for embedding Game of Life visualization in any website.

[![npm version](https://badge.fury.io/js/@ismailnguyen%2Fgame-of-life-js.svg)](https://www.npmjs.com/package/@ismailnguyen/game-of-life-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎮 **Easy to use**: Simple API with sensible defaults
- 🎨 **Customizable**: Configure colors, speed, grid size, and initial patterns
- 🚀 **Auto-start**: Begins automatically or on demand
- 🎯 **Lightweight**: No dependencies, pure JavaScript
- 📱 **Responsive**: Works on desktop and mobile
- 🔧 **Interactive**: Built-in controls for start/stop/reset

## Installation

```bash
npm install @ismailnguyen/game-of-life-js
```

Or include directly in your HTML:

```html
<script src="https://unpkg.com/@ismailnguyen/game-of-life-js/src/game-of-life.js"></script>
```

## Quick Start

### HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>Game of Life Demo</title>
</head>
<body>
    <div id="game-container"></div>
    
    <script src="https://unpkg.com/@ismailnguyen/game-of-life-js/src/game-of-life.js"></script>
    <script>
        // Simple usage with defaults
        GameOfLife.create('game-container');
    </script>
</body>
</html>
```

### Node.js / ES6 Modules

```javascript
const GameOfLife = require('game-of-life-js');

// Create game instance
const game = GameOfLife.create(document.getElementById('my-container'));
```

## API Reference

### GameOfLife.create(container, options)

Creates a new Game of Life instance in the specified container.

#### Parameters

- **container**: `HTMLElement | string` - The DOM element or element ID where the game will be rendered
- **options**: `Object` - Configuration options (optional)

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | `number` | `800` | Canvas width in pixels |
| `height` | `number` | `600` | Canvas height in pixels |
| `cellSize` | `number` | `10` | Size of each cell in pixels |
| `speed` | `number` | `100` | Animation speed (milliseconds between generations) |
| `autoStart` | `boolean` | `true` | Whether to start the game automatically |
| `initialPattern` | `string|Array` | `'random'` | Initial pattern ('random', 'glider', 'blinker', or custom array) |
| `fillColor` | `string` | `'#000000'` | Color for live cells |
| `backgroundColor` | `string` | `'#ffffff'` | Canvas background color |
| `borderColor` | `string` | `'#cccccc'` | Border color |

#### Returns

Returns a `GameOfLife` instance with the following methods:

- `start()` - Start the animation
- `stop()` - Stop the animation  
- `toggle()` - Toggle between start/stop
- `reset()` - Reset to initial state

## Examples

### Basic Usage

```javascript
// Minimal setup with defaults
GameOfLife.create('game-div');
```

### Custom Configuration

```javascript
GameOfLife.create('game-div', {
    width: 600,
    height: 400,
    cellSize: 8,
    speed: 150,
    fillColor: '#ff6b6b',
    backgroundColor: '#f8f9fa',
    initialPattern: 'glider'
});
```

### Manual Control

```javascript
const game = GameOfLife.create('game-div', {
    autoStart: false  // Don't start automatically
});

// Control manually
game.start();   // Start the game
game.stop();    // Stop the game
game.reset();   // Reset to initial state
```

### Custom Initial Patterns

```javascript
// Define a custom pattern (beacon oscillator)
const customPattern = [
    [1, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 1]
];

GameOfLife.create('game-div', {
    initialPattern: customPattern,
    cellSize: 15
});
```

### Built-in Patterns

Available built-in patterns:
- `'random'` - Random distribution of live cells
- `'glider'` - Classic glider pattern
- `'blinker'` - Simple oscillating pattern

## Conway's Game of Life Rules

The Game of Life follows these simple rules:

1. **Birth**: A dead cell with exactly 3 live neighbors becomes alive
2. **Survival**: A live cell with 2 or 3 live neighbors stays alive
3. **Death**: All other live cells die (underpopulation or overpopulation)

## Browser Support

This package works in all modern browsers that support:
- HTML5 Canvas
- ES5 JavaScript

## Development

```bash
# Clone the repository
git clone https://github.com/ismailnguyen/game-of-life-js.git

# Navigate to directory
cd game-of-life-js

# Open example.html in your browser to see the demo
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## About Conway's Game of Life

Conway's Game of Life is a cellular automaton devised by mathematician John Horton Conway in 1970. It's a zero-player game, meaning its evolution is determined by its initial state, requiring no further input. Despite its simple rules, the Game of Life is Turing complete and can simulate any computer algorithm.
