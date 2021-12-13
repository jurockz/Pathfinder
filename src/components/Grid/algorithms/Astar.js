import { unvisitedEdgeNotInUnvisitedNodes } from "./algorithmFuntions"

// A* Star Algorithmus 
// Der A* Algorithmus findet den kürzesten Weg zwischen zwei Knoten in einem Graphen.
// Dafür verwendet er eine Schätzungfunktion die hier "getEstimatedCost" heißt.
// Diese Geschätze Entfernung zum Ziel wird mit der jetztigen Entfernung addiert.
// So wird immer der Weg der kürzest geschätzten Entfernung gewählt.

export const astar = (grid, startCoordinates, endCoordinates) => {
    // Konstanten
    const unvisitedNodes = [];
    const visitedNodes = [];
    // Startknoten wird am Anfang der Suche eingefügt
    unvisitedNodes.push(grid[startCoordinates.row][startCoordinates.column])
    while(unvisitedNodes.length !== 0) { // Wenn es keinen Weg vom Start- zum Endpknoten gibt, soll abgebrochen werden
        // Die unbesuchen Knoten sollen nach ihrer geschätzten Distanz zum Endpunkt sortiert werden
        unvisitedNodes.sort((a,b) => a.totalDistance - b.totalDistance);
        // Der momentane Knoten wird ausgewählt und aus den unbesuchten Knoten rausgenommen
        let currentNode = unvisitedNodes.shift();

        // Ist der momentane Knoten eine Wand so soll mit dem nächten Knoten vortgefahren werden
        if(currentNode.isWall) continue;
        // ENDE: Ist der Endknoten gefunden wird die Liste der besuchten Knoten nach Reihenfolge ausgegeben
        if(currentNode === grid[endCoordinates.row][endCoordinates.column]) return visitedNodes;

        // Der momentan besuchte Knoten wird zu den besuchten Knoten hinzugefügt
        visitedNodes.push(currentNode);
        currentNode.isVisited = true;

        // Die Nachbarn des momentanen Knotens werden danach gefiltert ob sie schon einmal besucht wurden
        let unvisitedEdges = currentNode.edges.filter((Node) => !Node.isVisited);
        for(let unvisitedEdge of unvisitedEdges) {
            // Die Distanz der Nachbarn wird mit der Distanz des momentanigen Knotens mit eins addiert
            let unvisitedEdgeDistance = currentNode.distance + 1;
            if(unvisitedEdgeNotInUnvisitedNodes(unvisitedNodes, unvisitedEdge)) { // Es wird geprüft ob der Nachbar nicht schon in den unbesuchten Knoten enthalten ist
                // Der Nachbar wird am Anfang der unbesuchten Knoten eingefügt und die Distanzen werden errechnet
                unvisitedNodes.unshift(unvisitedEdge);
                unvisitedEdge.distance = unvisitedEdgeDistance;
                unvisitedEdge.totalDistance = unvisitedEdgeDistance + getEstimatedCost(unvisitedEdge, endCoordinates);
                unvisitedEdge.shortest = currentNode; // Um ausgehend vom Endpunkt später den kürzesten Weg zu finden 
            } else if(unvisitedEdgeDistance < unvisitedEdge.distance) { // In den unbesuchten Knoten -> Es wird geprüft ob der weg vom momentanigen Knoten zum Nachbarn kürzer ist als der alte Weg 
                // Die Distanz wird aktualisiert damit der Knoten bei der Auswahl des nächsten Knotens weiter nach vorne rückt
                unvisitedEdge.distance = unvisitedEdgeDistance;
                unvisitedEdge.totalDistance = unvisitedEdgeDistance + getEstimatedCost(unvisitedEdge, endCoordinates);
                unvisitedEdge.shortest = currentNode; // Um ausgehend vom Endpunkt später den kürzesten Weg zu finden 
            }

        }
    }
    return visitedNodes;
}

const getEstimatedCost = (unvisitedEdge, endCoordinates) => {
    let x = Math.abs(unvisitedEdge.coordinates.row - endCoordinates.row);
    let y = Math.abs(unvisitedEdge.coordinates.col - endCoordinates.column);
    return x + y;
}