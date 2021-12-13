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
  clearAllStates
} from "./components/Grid/datastructure/Graph";

// Algorithms
import { getShortestPath } from "./components/Grid/algorithms/algorithmFuntions"
import { breadthFirstSearch } from "./components/Grid/algorithms/BreadthFirstSearch";
import { depthFirstSearch } from "./components/Grid/algorithms/DepthFirstSearch";
import { astar } from "./components/Grid/algorithms/Astar";

// Random Walls
import { createRelatedWalls } from "./components/Grid/randomWalls/relatedWalls";

// Const
const graphRows = 20;
const graphColumns = 40;
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
  // Hooks
  // Changes the state of the clicked button and is used to know what to draw in the grid
  const [activeDrawButton, setActiveDrawButton] = useState("start");
  // 2D Array of the Grid and its states
  const [isGrid, setGrid] = useState(initializeGrid(graphRows, graphColumns));
  // The coordinates of the start and end cell
  const [isStart, setActiveStart] = useState(null);
  const [isEnd, setActiveEnd] = useState(null);
  // Changes the state of the algorithm Buttons and is used to know what algorithm to run
  const [isAlgorithm, setAlgorithm] = useState("Breadth First Search");
  // Is used to know if an algorithm is running at the moment
  const [isAlgorithmRunning, setAlgorithmRunning] = useState(false);
  // Counts to visualize the visited Nodes
  const [countPath, setCountPath] = useState(0);
  const [countVisitedNodes, setcountVisitedNodes] = useState(0);

  // Clears all states out of grid
  const handleGridClear = () => {
    if(isAlgorithmRunning) return;
    setGrid(clearAllStates(_.cloneDeep(isGrid)));
  }

  // Clears all states out of grid that are in connection to the animation of the algorithm
  const handleGridAlgorithmClear = () => {
    if(isAlgorithmRunning) return;
    setGrid(clearAlgorithmStates(_.cloneDeep(isGrid)));
  }

  // Draws "random" walls in the grid
  const randomGrid = () => {
    if(isAlgorithmRunning) return;
    setGrid(createRelatedWalls(clearAllStates(_.cloneDeep(isGrid), false), graphRows, graphColumns));
  }

  // Starts the algorithm
  const startAlgorithm = () => {
    if (!isStart || !isEnd || isAlgorithmRunning) return;
    setAlgorithmRunning(true);
    setGrid(clearAlgorithmStates(isGrid));
    setCountPath(0);
    setcountVisitedNodes(0);
    let algorithmOutput = null;
    if(isAlgorithm === "Breadth First Search") algorithmOutput = BFS();
    if(isAlgorithm === "A*") algorithmOutput = Astar();
    if(isAlgorithm === "Depth First Search") algorithmOutput = DFS();
    animate(algorithmOutput[0], algorithmOutput[1]);
  };

  // Starts the animation of the algorithm
  const animate = (visited, path) => {
    // Sets the isVisited states in the visited order of the algorithm every 20ms
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

      setcountVisitedNodes((prev) => prev+1)
      counter++;
    }, 20);
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
      setCountPath((prev) => prev+1);
      counter++;
    }, 20);
  };

  // Breadth First Search
  const BFS = () => {
    const copy = _.cloneDeep(isGrid);
    let visitedNodes = breadthFirstSearch(copy, isStart, isEnd);
    let shortestPath = getShortestPath(copy[isEnd.row][isEnd.column]);
    return [visitedNodes, shortestPath];
  };

  // Depth First Search
  const DFS = () => {
    const copy = _.cloneDeep(isGrid);
    let visitedNodes = depthFirstSearch(copy, isStart, isEnd);
    let shortestPath = getShortestPath(copy[isEnd.row][isEnd.column]);
    return [visitedNodes, shortestPath];
  };

  // A+
  const Astar = () => {
    const copy = _.cloneDeep(isGrid);
    let visitedNodes = astar(copy, isStart, isEnd);
    let shortestPath = getShortestPath(copy[isEnd.row][isEnd.column]);
    return [visitedNodes, shortestPath];
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
                active={activeDrawButton === item.text ? item.text : null}
                onClick={() => setActiveDrawButton(item.text)}
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
          activeButton={activeDrawButton}
          grid={isGrid}
          isStart={isStart}
          isEnd={isEnd}
          handleGridChange={setGrid}
          handleStartChange={setActiveStart}
          handleEndChange={setActiveEnd}
        ></Grid>
        <div className="count-wrapper">
          <div className="visited-Nodes-count">{countVisitedNodes} nodes visited</div>
          <div className="path-count">{countPath} nodes from start to end</div>
        </div>
      </div>
    </div>
  );
}

export default App;
