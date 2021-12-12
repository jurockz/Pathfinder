var rows = null;
var columns = null;

// Initialisiert ein 2D Array mit Knoten befüllt
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

// Erstellt einen Knoten
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
        edges: [] // Array das die Zeiger auf die Nachbar beinhaltet
    }
}

// Gibt zurück ob eine Koordinate noch im Raster ist
const isInGrid = (row, col) => {
    return (row >= 0 && col >= 0) && (row < rows && col < columns);
}

// Fügt allen Knoten in den edges die Nachbarn hinzu
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

// Setzt alle Zustände die vom Algorithmus gesetzt werden auf ihren ursprünglichen Wert
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

// Setzt alle Zustände auf ihren ursprünglichen Wert
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