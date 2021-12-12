// Setzt die Zustände der Knoten so, dass die Wahrscheinlichkeit für eine Wand am höhesten ist wenn der Knoten schon eine Wand in seiner nähe hat
export const createRelatedWalls = (grid, rows, columns) => {
    let randValue = .1;
    for(let row = 0; row < rows; row++) {
        for(let col = 0; col < columns; col++) {
            if(grid[row][col].isStart || grid[row][col].isEnd) continue;
            let count = NeighbourWallRowCount(grid, row, col);
            if(count === 0) {
                randValue = .3;
            } else if(count === 1) {
                randValue = .5;
            } else {
                randValue = 0;
            }

            if(Math.random() < randValue) {
                grid[row][col].isWall = true;
            }
        };
    };
    return grid;
}

// Zählt die Anzahl der Nachbarn (auch Diagonal) die eine Wand sind
const NeighbourWallRowCount = (grid, row, col) => {
    let count = 0;
    for(let y = -1; y < 2; y++) {
        for(let x = -1; x < 2; x++) {
            if(row+y === row && col+x === col) continue;
            if(grid[row+y]?.[col+x]?.isWall) count++;
        };
    };

    return count;
} 