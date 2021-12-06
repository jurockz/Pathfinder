

export const astar = (grid, startCoordinates, endCoordinates) => {
    const unvisitedVertices = [];
    const visitedVertices = [];
    unvisitedVertices.push(grid[startCoordinates.row][startCoordinates.column])
    while(unvisitedVertices.length !== 0) {
        unvisitedVertices.sort((a,b) => a.totalDistance - b.totalDistance);
        let currentVertex = unvisitedVertices.shift();

        if(currentVertex.isWall) continue;
        if(currentVertex === grid[endCoordinates.row][endCoordinates.column]) return visitedVertices;

        visitedVertices.push(currentVertex);
        currentVertex.isVisited = true;

        let unvisitedEdges = currentVertex.edges.filter((vertex) => !vertex.isVisited);
        for(let unvisitedEdge of unvisitedEdges) {
            let unvisitedEdgeDistance = currentVertex.distance + 1;
            if(unvisitedEdgeNotInUnvisitedVertices(unvisitedVertices, unvisitedEdge)) {
                unvisitedVertices.unshift(unvisitedEdge);
                unvisitedEdge.distance = unvisitedEdgeDistance;
                unvisitedEdge.totalDistance = unvisitedEdgeDistance + getEstimatedCost(unvisitedEdge, endCoordinates);
                unvisitedEdge.shortest = currentVertex;
            } else if(unvisitedEdgeDistance < unvisitedEdge.distance) {
                unvisitedEdge.distance = unvisitedEdgeDistance;
                unvisitedEdge.totalDistance = unvisitedEdgeDistance + getEstimatedCost(unvisitedEdge, endCoordinates);
                unvisitedEdge.shortest = currentVertex;
            }

        }
    }
    return visitedVertices;
}

const unvisitedEdgeNotInUnvisitedVertices = (unvisitedVertices, unvisitedEdge) => {
    for(let unvisited of unvisitedVertices) {
        if(unvisited.coordinates.row === unvisitedEdge.coordinates.row && unvisited.coordinates.col === unvisitedEdge.coordinates.col) {
            return false;
        }
    }
    return true;
}

const getEstimatedCost = (unvisitedEdge, endCoordinates) => {
    let x = Math.abs(unvisitedEdge.coordinates.row - endCoordinates.row);
    let y = Math.abs(unvisitedEdge.coordinates.col - endCoordinates.column);
    return x + y;
}

export const getShortestPath = (endVertex) => {
    const shortestPath = [];
    let currentVertex = endVertex;
    while(currentVertex !== null) {
        shortestPath.unshift(currentVertex);
        currentVertex = currentVertex.shortest;
    }
    return shortestPath;
}