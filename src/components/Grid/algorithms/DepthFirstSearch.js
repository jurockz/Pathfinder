// Tiefensuche 
// Die Tiefensuche untersucht immer als erstes wieder den ersten Nachbarn des Nachbarn des momentanigen Knotens.
// Dabei wird hier häufig keine gute Lösung gefunden.

export function depthFirstSearch(grid, startCoordinates, endCoordinates) {
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
            unvisitedVertices.unshift(unvisitedEdge); // Der Nachbar wird am Anfang der unbesuchten Knoten eingefügt
        }
    }
    return visitedVertices;
}