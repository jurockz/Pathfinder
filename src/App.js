import './App.css';
import React, { useState } from "react";

import { Button } from "./components/Button";
import { Grid } from "./components/Grid";

const buttons = [
  {text: "start", color: "yellow"},
  {text: "wall", color: "black"},
  {text: "end", color: "red"}
]


function App() {
  const [isActiveItem, setIsActiveItem] = useState("start");
  const [isStarted, setStarted] = useState(false);

  return (
    <div class="wrapper">
      <div class="upper">
        {buttons.map((item) => {
          return (
            <Button
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
            active={isStarted}
            onClick={() => setStarted(true)}
          >
            Start
        </Button>
      </div>
      <div class="lower">
        <Grid 
          fieldSquare={40}
          gridHeight={5}
          gridWidth={5}
          activeButton={isActiveItem}
          startAlgorithm={isStarted}
        ></Grid>
      </div>
    </div>
  );
}

export default App;
