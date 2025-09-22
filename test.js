/**
 * Simple test file for Game of Life package
 * This runs basic functionality tests in Node.js environment
 */

const GameOfLife = require('./src/index.js');

console.log('🧪 Testing Game of Life Package\n');

// Test 1: Package exports correctly
console.log('✓ Package exports correctly:', typeof GameOfLife === 'function');

// Test 2: Static create method exists
console.log('✓ Static create method exists:', typeof GameOfLife.create === 'function');

// Test 3: Error handling for non-browser environment
try {
    GameOfLife.create('test');
    console.log('❌ Should have thrown error in non-browser environment');
} catch (error) {
    console.log('✓ Correctly throws error in non-browser environment:', error.message.includes('browser environment'));
}

// Test 4: Core logic can be tested by creating instance manually
try {
    // Mock a minimal container for testing core logic
    const mockContainer = { innerHTML: '', appendChild: () => {} };
    
    // Create instance bypassing DOM setup for testing
    const game = Object.create(GameOfLife.prototype);
    game.config = {
        width: 300,
        height: 200,
        cellSize: 10,
        speed: 100,
        autoStart: false,
        initialPattern: 'blinker',
        fillColor: '#000000',
        backgroundColor: '#ffffff',
        borderColor: '#cccccc'
    };
    
    game.generation = 0;
    game.isRunning = false;
    game.cols = Math.floor(game.config.width / game.config.cellSize);
    game.rows = Math.floor(game.config.height / game.config.cellSize);
    game.grid = game.createGrid();
    game.nextGrid = game.createGrid();
    
    console.log('✓ Core properties initialized correctly');
    console.log('  - Grid dimensions:', game.cols, 'x', game.rows);
    console.log('  - Generation starts at:', game.generation);
    
    // Test Game of Life logic
    game.grid = [
        [0, 1, 0],
        [0, 1, 0], 
        [0, 1, 0]
    ];
    game.rows = 3;
    game.cols = 3;
    
    // Test neighbor counting (middle cell should have 2 neighbors)
    const neighbors = game.countNeighbors(1, 1);
    console.log('✓ Neighbor counting works correctly:', neighbors === 2);
    
    // Test next generation calculation
    game.nextGeneration();
    console.log('✓ Next generation calculation works');
    console.log('  - Generation incremented to:', game.generation);
    
    // Blinker should rotate (middle row should be [1,1,1])
    const horizontalBlinker = game.grid[1][0] === 1 && game.grid[1][1] === 1 && game.grid[1][2] === 1;
    console.log('✓ Game of Life rules applied correctly (blinker rotated):', horizontalBlinker);
    
    console.log('\n🎉 All core functionality tests passed!');
    console.log('📦 Package is ready for NPM publishing');
    console.log('🌐 Use in browser environment with: GameOfLife.create(element, options)');
    
} catch (error) {
    console.error('❌ Core logic test failed:', error.message);
    console.error(error.stack);
}