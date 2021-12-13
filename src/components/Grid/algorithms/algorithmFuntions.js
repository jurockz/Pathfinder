// Speichert den Weg nach der Reihenfolge des algorithmus vom Start- zum Endknoten 
export function getShortestPath(endNode) {
    const shortestPath = [];
    let currentNode = endNode;
    while(currentNode !== null) {
        shortestPath.unshift(currentNode);
        currentNode = currentNode.shortest;
    }
    return shortestPath;
}

// Gibt zurück ob ein Knoten in den unbesuchten Knoten ist
export const unvisitedEdgeNotInUnvisitedNodes = (unvisitedNodes, unvisitedEdge) => {
    for(let unvisited of unvisitedNodes) {
        if(unvisited.coordinates.row === unvisitedEdge.coordinates.row && unvisited.coordinates.col === unvisitedEdge.coordinates.col) {
            return false;
        }
    }
    return true;
}