import Vertex from "./Vertex.js"

export default class Graph {
    constructor() {
        this.vertices = [];
    }

    findVertex(row, column) {
        return this.vertices.find(vertex => vertex.row === row && vertex.column === column);
    }

    removeVertex(row,column) {
        const toDelete = this.findVertex(row, column);

        toDelete.edges.forEach(vertex => {
            this.removeEdge(toDelete.row, toDelete.column, vertex.row, vertex.column);
        });
        const index = this.vertices.findIndex(x => x.row === row && x.column === column);
        this.vertices.splice(index, 1);
    }
    
    addVertex(row, column, type="undefined") {
        const current = this.findVertex(row, column);
        if(current === undefined) {
            this.vertices.push(new Vertex(row, column, type))
        } else {
            current.changeType(type);
        }
    }

    addEdge(r1, c1, r2, c2) {
        const vertex1 = this.findVertex(r1, c1);
        const vertex2 = this.findVertex(r2, c2);
        if(vertex1 === undefined) {
            console.log(`ERROR: Vertex(${r1},${c1}) wasn't found!`); 
            return;
        }
        if(vertex2 === undefined) {
            console.log(`ERROR: Vertex(${r2},${c2}) wasn't found!`); 
            return;
        }
        vertex1.addEdge(vertex2);
        vertex2.addEdge(vertex1);
    }

    removeEdge(r1, c1, r2, c2) {
        const vertex1 = this.findVertex(r1, c1);
        const vertex2 = this.findVertex(r2, c2);
        if(vertex1 === undefined) {
            console.log(`ERROR: Vertex(${r1},${c1}) wasn't found!`); 
            return;
        }
        if(vertex2 === undefined) {
            console.log(`ERROR: Vertex(${r2},${c2}) wasn't found!`); 
            return;
        }

        vertex1.removeEdge(vertex2);
        vertex2.removeEdge(vertex1);
    }

    // constructor() {
    //     this.vertices = [];
    //     this.edges = [];
    //     this.numberOfEdges = [];       
    // }

    // addVertex(vertex) {
    //     this.vertex.push(vertex);

    //     this.edges[vertex] = [];
    // }

    // removeVertex(vertex) {
    //     const index = this.vertices.indexOf(vertex);

    //     if(index >= 0) {
    //         this.vertices.splice(index, 1);
    //     }

    //     while(this.edges[vertex].length) {
    //         const adjacentVertex = this.edges[vertex].pop();

    //         this.removeEdge(adjacentVertex, vertex);
    //     }
    // }

    // addEdge(vertex1, vertex2) {
    //     this.edges[vertex1].push(vertex2);
    //     this.edges[vertex2].push(vertex1);
    //     this.numberOfEdges++;
    // }

    // removeEdge(vertex1, vertex2) {
    //     const index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1;
    //     const index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1;

    //     if(index1 >= 0) {
    //         this.edges[vertex1].splice(index1, 1);
    //         this.numberOfEdges--;
    //     }
    //     if(index2 >= 0) {
    //         this.edges[vertex2].splice(index2, 1);
    //     }
    // }

    // isIn(vertex) {
    //     return this.vertices.indludes(vertex);
    // }

    // size() {
    //     return this.vertices.length;
    // }

    // relations() {
    //     return this.numberOfEdges;
    // }
}