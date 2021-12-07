export function depthFirstSearch(grid, startCoordinates, endCoordinates) {
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
            unvisitedVertices.unshift(unvisitedEdge);
        }
    }
    return visitedVertices;
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