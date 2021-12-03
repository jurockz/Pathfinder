import './App.css';
import React, { useState } from "react";
import _ from "lodash";

// Components
import { Button } from "./components/Button";
import { Grid } from "./components/Grid";

// Grid
import { initializeGrid, clearAlgorithmStates } from './components/Grid/datastructure/Graph';

// Algorithms
import { breadthFirstSearch, getShortestPath} from "./components/Grid/algorithms/BreadthFirstSearch"

// Const
const graphRows = 10;
const graphColumns = 20;
const buttons = [
  {text: "start", color: "yellow"},
  {text: "wall", color: "black"},
  {text: "end", color: "red"}
]
var counter = 0;


function App() {
  const [isActiveItem, setIsActiveItem] = useState("start");

  const [isGrid, setGrid] = useState(initializeGrid(graphRows, graphColumns));
  const [isStart, setActiveStart] = useState(null);
  const [isEnd, setActiveEnd] = useState(null);

  const handleGridChange = (newGrid) => {
    setGrid(newGrid);
  }

  const handleStartChange = (coordinates) => {
    setActiveStart(coordinates);
  }

  const handleEndChange = (coordinates) => {
    setActiveEnd(coordinates);
  }

  const startAlgorithm = () => {
    if(!isStart || !isEnd) return;
    setGrid(clearAlgorithmStates(isGrid));
    const algorithmOutput = BFS();
    animate(algorithmOutput[0], algorithmOutput[1]);
  }

  const animate = (visited, path) => {
    var interval = setInterval(() => {
      if(counter === visited.length) {
        counter = 0;
        clearInterval(interval);
        animatePath(path);
        return;
      }
      setGrid(prevGrid => {
        const copy = _.cloneDeep(prevGrid);
        copy[visited[counter].coordinates.row][visited[counter].coordinates.col].isVisited = true;
        return copy;
      });
      counter++;
    },50)
    
  }

  const animatePath = (path) => {
    var interval = setInterval(() => {
      if(counter === path.length) {
        counter = 0;
        clearInterval(interval);
        return;
      }
      setGrid(prevGrid => {
        const copy = _.cloneDeep(prevGrid);
        copy[path[counter].coordinates.row][path[counter].coordinates.col].isShortest = true;
        return copy;
      });
      counter++;
    },50)
  }



  const BFS = () => {
    const copy = _.cloneDeep(isGrid);
    let visitedVertices = breadthFirstSearch(copy, isStart, isEnd)
    let shortestPath = getShortestPath(copy[isEnd.row][isEnd.column])
    return [visitedVertices, shortestPath]
  }

  return (
    <div className="wrapper">
      <div className="upper">
        {buttons.map((item, index) => {
          return (
            <Button
            key={index}
            color={item.color}
            active={isActiveItem === item.text ? item.text : null}
            onClick={() => setIsActiveItem(item.text)}
          >
            {item.text}
          </Button>
          );
        })}
        <Button
            color={"green"}
            active={false}
            onClick={() => startAlgorithm()}
          >
            Start
        </Button>
      </div>
      <div className="lower">
        <Grid 
          fieldSquare={40}
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
