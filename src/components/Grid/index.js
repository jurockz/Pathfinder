import React, { useState } from "react";

import { StyledGrid, StyledRow } from "./styles";
import { Cell } from "./Cell";
import _ from "lodash";

export const Grid = ({
  activeButton,
  grid,
  isStart,
  isEnd,
  handleStartChange,
  handleEndChange,
  handleGridChange,
}) => {
  // Hooks
  const [isMouseDown, setMouseDown] = useState(false);
  const [isCellTriggered, setCellTriggered] = useState(false);

  const clickHandler = (row, column) => {
    // Start and end not at the same position
    if (
      (isStart?.row === row && isStart?.column === column) ||
      (isEnd?.row === row && isEnd?.column === column)
    ) {
      return;
    }
    // Start and end not on wall
    if (grid[row][column].isWall) {
      toggleStateGrid(row, column, "isWall");
    }
    // Set start or end
    const coordinates = { row: row, column: column };
    if (activeButton === "start") {
      handleStartChange(coordinates);
      toggleStateGrid(row, column, "isStart");
    } else if (activeButton === "end") {
      handleEndChange(coordinates);
      toggleStateGrid(row, column, "isEnd");
    }
  };

  const mouseMoveHandler = (row, column) => {
    if (isMouseDown && !isCellTriggered && activeButton === "wall") {
      if (
        (isStart?.row === row && isStart?.column === column) ||
        (isEnd?.row === row && isEnd?.column === column)
      ) {
        return;
      }
      toggleStateGrid(row, column, "isWall");
      setCellTriggered(true);
    }
  };

  const toggleStateGrid = (row, col, state) => {
    const temp = _.cloneDeep(grid);
    if (isEnd && state === "isEnd")
      temp[isEnd.row][isEnd.column][state] = false;
    if (isStart && state === "isStart")
      temp[isStart.row][isStart.column][state] = false;
    temp[row][col][state] = !temp[row][col][state];
    handleGridChange(temp);
  };

  const returnExtraClass = (row, column) => {
    if (grid[row][column].isStart) {
      return "isStart";
    } else if (grid[row][column].isEnd) {
      return "isEnd";
    } else if (grid[row][column].isWall) {
      return "isWall";
    } else if (grid[row][column].isShortest) {
      return "isShortest";
    } else if (grid[row][column].isVisited) {
      return "isVisited";
    } else {
      return "";
    }
  }

  return (
    <>
      <StyledGrid
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
      >
        {grid.map((rowItem, row) => {
          return (
            <StyledRow key={row}>
              {rowItem.map((y, column) => {
                return (
                  <Cell
                    key={column}
                    extraClass={returnExtraClass(row,column)}
                    onClick={() => clickHandler(row, column)}
                    onMouseMove={() => mouseMoveHandler(row, column)}
                    onMouseLeave={() => setCellTriggered(false)}
                  ></Cell>
                );
              })}
            </StyledRow>
          );
        })}
      </StyledGrid>
    </>
  );
};
