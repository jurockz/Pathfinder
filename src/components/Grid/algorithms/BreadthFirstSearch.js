import { unvisitedEdgeNotInUnvisitedVertices } from "./algorithmFuntions"

// Breitensuche
// Bei der Breitensuche werden zuerst alle Nachbarn des momentanigen Knotens untersucht.
// So wird immer weitergesucht bis der Endknoten gefunden ist.

export function breadthFirstSearch(grid, startCoordinates, endCoordinates) {
    // Konstanten 
    const unvisitedVertices = [];
    const visitedVertices = [];
    // Startknoten wird am Anfang der Suche eingefügt
    unvisitedVertices.push(grid[startCoordinates.row][startCoordinates.column])
    while(unvisitedVertices.length !== 0) { // Wenn es keinen Weg vom Start- zum Endpknoten gibt, soll abgebrochen werden
        // Der momentane Knoten wird ausgewählt und aus den unbesuchten Knoten rausgenommen
        let currentVertex = unvisitedVertices.shift();

        // Ist der momentane Knoten eine Wand so soll mit dem nächten Knoten vortgefahren werden
        if(currentVertex.isWall) continue;
        // ENDE: Ist der Endknoten gefunden wird die Liste der besuchten Knoten nach Reihenfolge ausgegeben
        if(currentVertex === grid[endCoordinates.row][endCoordinates.column]) return visitedVertices;

        // Der momentan besuchte Knoten wird zu den besuchten Knoten hinzugefügt
        visitedVertices.push(currentVertex);
        currentVertex.isVisited = true;

        // Die Nachbarn des momentanen Knotens werden danach gefiltert ob sie schon einmal besucht wurden
        let unvisitedEdges = currentVertex.edges.filter((vertex) => !vertex.isVisited)
        for(let unvisitedEdge of unvisitedEdges) {
            unvisitedEdge.shortest = currentVertex; // Um ausgehend vom Endpunkt später den kürzesten Weg zu finden 
            if(unvisitedEdgeNotInUnvisitedVertices(unvisitedVertices, unvisitedEdge)) { // Es wird geprüft ob der Nachbar nicht schon in den unbesuchten Knoten enthalten ist
                unvisitedVertices.push(unvisitedEdge); // Die Nachbarn werden am ende der unbesuchten Knoten eingefügt
            }
        }
    }
    return visitedVertices;
}