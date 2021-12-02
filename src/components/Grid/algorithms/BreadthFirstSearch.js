export function breadthFirstSearch(grid, startCoordinates, endCoordinates) {
    const unvisitedVertices = [];
    const visitedVertices = [];
    unvisitedVertices.push(grid[startCoordinates.row][startCoordinates.column])
    while(unvisitedVertices.length !== 0) {
        let currentVertex = unvisitedVertices.shift();
        if(currentVertex.isWall) continue;
        if(currentVertex === grid[endCoordinates.row][endCoordinates.column]) return visitedVertices;
        visitedVertices.push(currentVertex);
        currentVertex.isVisited = true;
        let unvisitedEdges = currentVertex.edges.filter((vertex) => !vertex.isVisited)
        for(let unvisitedEdge of unvisitedEdges) {
            unvisitedEdge.shortest = currentVertex;
            if(unvisitedEdgeNotInUnvisitedVertices(unvisitedVertices, unvisitedEdge)) {
                unvisitedVertices.push(unvisitedEdge);
            }
        }
    }
    return visitedVertices;
}

function unvisitedEdgeNotInUnvisitedVertices(unvisitedVertices, unvisitedEdge) {
    for(let unvisited of unvisitedVertices) {
        if(unvisited.coordinates.row === unvisitedEdge.coordinates.row && unvisited.coordinates.col === unvisitedEdge.coordinates.col) {
            return false;
        }
    }
    return true;
}

export function getShortestPath(endVertex) {
    const shortestPath = [];
    let currentVertex = endVertex;
    while(currentVertex !== null) {
        shortestPath.unshift(currentVertex);
        currentVertex = currentVertex.shortest;
    }
    return shortestPath;
}