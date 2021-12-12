// Speichert den Weg nach der Reihenfolge des algorithmus vom Start- zum Endknoten 
export function getShortestPath(endVertex) {
    const shortestPath = [];
    let currentVertex = endVertex;
    while(currentVertex !== null) {
        shortestPath.unshift(currentVertex);
        currentVertex = currentVertex.shortest;
    }
    return shortestPath;
}

// Gibt zurück ob ein Knoten in den unbesuchten Knoten ist
export const unvisitedEdgeNotInUnvisitedVertices = (unvisitedVertices, unvisitedEdge) => {
    for(let unvisited of unvisitedVertices) {
        if(unvisited.coordinates.row === unvisitedEdge.coordinates.row && unvisited.coordinates.col === unvisitedEdge.coordinates.col) {
            return false;
        }
    }
    return true;
}