import { unvisitedEdgeNotInUnvisitedNodes } from "./algorithmFuntions"

// Breitensuche
// Bei der Breitensuche werden zuerst alle Nachbarn des momentanigen Knotens untersucht.
// So wird immer weitergesucht bis der Endknoten gefunden ist.

export function breadthFirstSearch(grid, startCoordinates, endCoordinates) {
    // Konstanten 
    const unvisitedNodes = [];
    const visitedNodes = [];
    // Startknoten wird am Anfang der Suche eingefügt
    unvisitedNodes.push(grid[startCoordinates.row][startCoordinates.column])
    while(unvisitedNodes.length !== 0) { // Wenn es keinen Weg vom Start- zum Endpknoten gibt, soll abgebrochen werden
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
        let unvisitedEdges = currentNode.edges.filter((Node) => !Node.isVisited)
        for(let unvisitedEdge of unvisitedEdges) {
            unvisitedEdge.shortest = currentNode; // Um ausgehend vom Endpunkt später den kürzesten Weg zu finden 
            if(unvisitedEdgeNotInUnvisitedNodes(unvisitedNodes, unvisitedEdge)) { // Es wird geprüft ob der Nachbar nicht schon in den unbesuchten Knoten enthalten ist
                unvisitedNodes.push(unvisitedEdge); // Die Nachbarn werden am ende der unbesuchten Knoten eingefügt
            }
        }
    }
    return visitedNodes;
}