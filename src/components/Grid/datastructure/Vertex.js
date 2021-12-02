export default class Vertex {
    constructor(row, column, type="undefined") {
        this.row = row;
        this.column = column;
        this.edges = [];
        this.type = type;
    }

    addEdge(vertex) {
        if(this.edges.includes(vertex)) return;
        this.edges.push(vertex);
    }

    removeEdge(vertex) {
        const index = this.edges.findIndex(x => x.row === vertex.row && x.column === vertex.column);
        this.edges.splice(index, 1);

    }

    changeType(type) {
        this.type = type;
    }
}