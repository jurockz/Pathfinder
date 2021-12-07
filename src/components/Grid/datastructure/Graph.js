var rows = null;
var columns = null;

export const initializeGrid = (graphRows, graphColumns) => {
    rows = graphRows;
    columns = graphColumns;
    let grid = [];
    for(let row = 0; row < rows; row++) {
        let gridRow = [];
        for(let col = 0; col < columns; col++) {
            gridRow.push(createVertex(row, col));
        }
        grid.push(gridRow);
    }
    return addEdges(grid);
}

const createVertex = (row, col) => {
    return {
        coordinates: {row, col},
        isStart: false,
        isEnd: false,
        isVisited: false,
        isShortest: false,
        isWall: false,
        shortest: null,
        distance: 0,
        totalDistance: 0,
        edges: []
    }
}

const isInGrid = (row, col) => {
    return (row >= 0 && col >= 0) && (row < rows && col < columns);
}

const addEdges = (grid) => {
    for(let row = 0; row < rows; row++) {
        for(let col = 0; col < columns; col++) {
            if(isInGrid(row, col-1)) grid[row][col].edges.push(grid[row][col-1]); // left
            if(isInGrid(row, col+1)) grid[row][col].edges.push(grid[row][col+1]); // right
            if(isInGrid(row-1, col)) grid[row][col].edges.push(grid[row-1][col]); // up
            if(isInGrid(row+1, col)) grid[row][col].edges.push(grid[row+1][col]); // down
        };
    };
    return grid;
}

export const clearAlgorithmStates = (grid) => {
    for(let row = 0; row < rows; row++) {
        for(let col = 0; col < columns; col++) {
            grid[row][col].isVisited = false;
            grid[row][col].isShortest = false;
            grid[row][col].shortest = null;
        };
    };
    return grid;
}

export const clearAllStates = (grid, withStartEnd=true) => {
    for(let row = 0; row < rows; row++) {
        for(let col = 0; col < columns; col++) {
            if(withStartEnd) {
                grid[row][col].isStart = false;
                grid[row][col].isEnd = false;
            }
            grid[row][col].isWall = false;
            grid[row][col].isVisited = false;
            grid[row][col].isShortest = false;
            grid[row][col].shortest = false;
        };
    };
    return grid;
}

export const randomStates = (grid) => {
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