import "./App.css";
import React, { useState } from "react";
import _ from "lodash";

// Components
import { Button } from "./components/Button";
import { Grid } from "./components/Grid";

// Grid
import {
  initializeGrid,
  clearAlgorithmStates,
  clearAllStates,
  randomStates
} from "./components/Grid/datastructure/Graph";

// Algorithms
import {
  breadthFirstSearch,
  getShortestPath
} from "./components/Grid/algorithms/BreadthFirstSearch";
import {
  depthFirstSearch
} from "./components/Grid/algorithms/DepthFirstSearch";
import {
  astar
} from "./components/Grid/algorithms/Astar";

// Const
const graphRows = 20;
const graphColumns = 40;
const fieldSquare = 20;
const buttons = [
  { text: "start", color: "yellow" },
  { text: "wall", color: "black" },
  { text: "end", color: "#be5151" },
];
const AlgorithmButtons = [
  { text: "Breadth First Search", color: "transparent" },
  { text: "A*", color: "transparent" },
  { text: "Depth First Search", color: "transparent" }
];
var counter = 0;

function App() {
  const [isActiveItem, setIsActiveItem] = useState("start");

  const [isGrid, setGrid] = useState(initializeGrid(graphRows, graphColumns));
  const [isStart, setActiveStart] = useState(null);
  const [isEnd, setActiveEnd] = useState(null);
  const [isAlgorithm, setAlgorithm] = useState("Breadth First Search");
  const [isAlgorithmRunning, setAlgorithmRunning] = useState(false);

  const handleGridChange = (newGrid) => {
    setGrid(newGrid);
  };

  const handleStartChange = (coordinates) => {
    setActiveStart(coordinates);
  };

  const handleEndChange = (coordinates) => {
    setActiveEnd(coordinates);
  };

  const handleGridClear = () => {
    if(isAlgorithmRunning) return;
    setGrid(clearAllStates(_.cloneDeep(isGrid)));
  }

  const handleGridAlgorithmClear = () => {
    if(isAlgorithmRunning) return;
    setGrid(clearAlgorithmStates(_.cloneDeep(isGrid)));
  }

  const randomGrid = () => {
    if(isAlgorithmRunning) return;
    setGrid(randomStates(clearAllStates(_.cloneDeep(isGrid), false)));
  }

  const startAlgorithm = () => {
    if (!isStart || !isEnd || isAlgorithmRunning) return;
    setAlgorithmRunning(true);
    setGrid(clearAlgorithmStates(isGrid));
    let algorithmOutput = null;
    if(isAlgorithm === "Breadth First Search") algorithmOutput = BFS();
    if(isAlgorithm === "A*") algorithmOutput = Astar();
    if(isAlgorithm === "Depth First Search") algorithmOutput = DFS();
    animate(algorithmOutput[0], algorithmOutput[1]);
  };

  const animate = (visited, path) => {
    var interval = setInterval(() => {
      if (counter === visited.length) {
        counter = 0;
        clearInterval(interval);
        animatePath(path);
        return;
      }
      setGrid((prevGrid) => {
        const copy = _.cloneDeep(prevGrid);
        copy[visited[counter].coordinates.row][
          visited[counter].coordinates.col
        ].isVisited = true;
        return copy;
      });
      counter++;
    }, 10);
  };

  const animatePath = (path) => {
    var interval = setInterval(() => {
      if (counter === path.length) {
        counter = 0;
        setAlgorithmRunning(false);
        clearInterval(interval);
        return;
      }
      setGrid((prevGrid) => {
        const copy = _.cloneDeep(prevGrid);
        copy[path[counter].coordinates.row][
          path[counter].coordinates.col
        ].isShortest = true;
        return copy;
      });
      counter++;
    }, 10);
  };

  const BFS = () => {
    const copy = _.cloneDeep(isGrid);
    let visitedVertices = breadthFirstSearch(copy, isStart, isEnd);
    let shortestPath = getShortestPath(copy[isEnd.row][isEnd.column]);
    return [visitedVertices, shortestPath];
  };

  const DFS = () => {
    const copy = _.cloneDeep(isGrid);
    let visitedVertices = depthFirstSearch(copy, isStart, isEnd);
    let shortestPath = getShortestPath(copy[isEnd.row][isEnd.column]);
    return [visitedVertices, shortestPath];
  };

  const Astar = () => {
    const copy = _.cloneDeep(isGrid);
    let visitedVertices = astar(copy, isStart, isEnd);
    let shortestPath = getShortestPath(copy[isEnd.row][isEnd.column]);
    return [visitedVertices, shortestPath];
  };

  return (
    <div className="wrapper">
      <div className="upper">
        <div className="click-container">
          <div className="title">Set states:</div>
          {buttons.map((item, index) => {
            return (
              <Button
                key={index}
                alone={false}
                color={item.color}
                active={isActiveItem === item.text ? item.text : null}
                onClick={() => setIsActiveItem(item.text)}
              >
                {item.text}
              </Button>
            );
          })}
        </div>
        <div className="click-container">
          <div className="title">Set algorithm:</div>
          {AlgorithmButtons.map((item, index) => {
            return (
              <Button
                key={index}
                alone={false}
                color={item.color}
                active={isAlgorithm === item.text ? item.text : null}
                onClick={() => setAlgorithm(item.text)}
              >
                {item.text}
              </Button>
            );
          })}
        </div>
        <Button color={"transparent"} alone={true} active={isAlgorithmRunning} onClick={() => handleGridAlgorithmClear()}>
          Clear algorithm states
        </Button>
        <Button color={"transparent"} alone={true} active={isAlgorithmRunning} onClick={() => handleGridClear()}>
          Clear grid
        </Button>
        <Button color={"transparent"} alone={true} active={isAlgorithmRunning} onClick={() => randomGrid()}>
          Random grid
        </Button>
        <Button color={"transparent"} alone={true} active={isAlgorithmRunning} onClick={() => startAlgorithm()}>
          Start
        </Button>
      </div>
      <div className="lower">
        <Grid
          fieldSquare={fieldSquare}
          activeButton={isActiveItem}
          grid={isGrid}
          isStart={isStart}
          isEnd={isEnd}
          handleGridChange={handleGridChange}
          handleStartChange={handleStartChange}
          handleEndChange={handleEndChange}
        ></Grid>
      </div>
    </div>
  );
}

export default App;
