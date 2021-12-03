import React, { useState, useEffect } from "react";

import { StyledGrid, StyledRow } from "./styles";
import { Node } from "./Node";
import _ from "lodash"

export const Grid = ({ fieldSquare, activeButton, grid, isStart, isEnd, handleStartChange, handleEndChange, handleGridChange }) => {
    const [isMouseDown, setMouseDown] = useState(false);
    const [isFieldTriggered, setFieldTriggered] = useState(false);

    //Pathfinding------------------START--------------------------------------------------------

    // const [isAnimationIndex, setAnimationIndex] = useState(0);
    // const [isAnimationStarted, setAnimationStarted] = useState(false);
    // const [isShortestPath, setShortestPath] = useState(null);
    // const [isVisitedVertices, setVisitedVertices] = useState(null);

    // const animateAlgorithm = (visitedVertices, shortestPath) => {
    // //     setAnimationIndex(0);
    // //     var interval = setTimeout(function(){
    // //         debugger;
    // //         // const copy = _.cloneDeep(isGrid);
    // //         // copy[visitedVertices[index].coordinates.row][visitedVertices[index].coordinates.col].isVisited = true;
    // //         // setGrid(copy);
    // //         let temp = isAnimationIndex +1;
    // //         setAnimationIndex(temp);
    // //         if(isAnimationIndex === visitedVertices.length){
    // //             clearInterval(interval);
    // //         }
    // //    }, 1000)
    // }


    // const BFS = () => {
    //     const copy = _.cloneDeep(isGrid);
    //     setShortestPath(breadthFirstSearch(copy, isStart, isEnd))
    //     setVisitedVertices(getShortestPath(copy[isEnd.row][isEnd.column]))
    // }

    // useEffect(() => {
    //     if(startAlgorithm) {
    //         const ret = BFS();
    //         // var interval = null;
    //         // const ret = BFS();
    //         // var visitedVertices = ret[0];
    //         // var shortestPath = ret[1];
    //         // interval = setInterval(() => {
    //         //     setAnimationIndex((temp) => {
    //         //         if(temp === visitedVertices.length) {
    //         //             console.log("end of visited");
    //         //             clearInterval(interval);
    //         //         }
    //         //         debugger;
    //         //         // const copy = _.cloneDeep(isGrid);
    //         //         // copy[visitedVertices[isAnimationIndex].coordinates.row][visitedVertices[isAnimationIndex].coordinates.col].isVisited = true;
    //         //         // setGrid(copy);
    //         //         return temp +1;
    //         //     });
    //         // },1000)
    //         // return () =>{if(interval !== null) clearInterval(interval);}
    //         console.log(isShortestPath);
    //         debugger;
    //         const counterInterval = setInterval(function () {
    //             debugger;
    //             setAnimationIndex((prev) => {
    //                 debugger;
    //                 console.log(prev);
    //                 // const copy = _.cloneDeep(isGrid);
    //                 // copy[1][1].isVisited = !copy[1][1].isVisited
    //                 // setGrid(copy);
    //                 return prev + 1;
    //             });
    //         }, 1000);
    //         return () => clearInterval(counterInterval);

    //     }
    // }, [startAlgorithm, isShortestPath])

    //Pathfinding------------------END----------------------------------------------------------

    const clickHandler = (row, column) => {
        // Start and end not at the same position 
        if((isStart?.row === row && isStart?.column === column) ||
            (isEnd?.row === row && isEnd?.column === column)) {
                return;
        }
        // Start and end not on wall
        if(grid[row][column].isWall) {
            toggleStateGrid(row,column, "isWall");
        }
        // Set start or end 
        const coordinates = {row: row, column: column};
        if(activeButton === "start") {
            handleStartChange(coordinates);
            toggleStateGrid(row,column, "isStart");
        } else if(activeButton === "end") {
            handleEndChange(coordinates);
            toggleStateGrid(row,column, "isEnd");
        }
    }

    const mouseMoveHandler = (row, column) => {
        if(isMouseDown && !isFieldTriggered && activeButton === "wall") {
            if((isStart?.row === row && isStart?.column === column) ||
                (isEnd?.row === row && isEnd?.column === column)) {
                    return;
            }
            toggleStateGrid(row,column, "isWall");
            setFieldTriggered(true);
        }
    }

    const toggleStateGrid = (row, col, state) => {
        const temp = _.cloneDeep(grid);
        if(isEnd && state === "isEnd") temp[isEnd.row][isEnd.column][state] = false;
        if(isStart && state === "isStart") temp[isStart.row][isStart.column][state] = false;
        temp[row][col][state] = !temp[row][col][state];
        handleGridChange(temp);
    }

    const returnState = (row, column, state) => {
        if(grid[row][column].isStart && state === "start") {
            return true;
        } else if(grid[row][column].isEnd && state === "end") {
            return true;
        } else if(grid[row][column].isWall && state === "wall") {
            return true;
        } else {
            return false;
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
                                <Node
                                    key={column}
                                    fieldSquare={fieldSquare}
                                    isStart={returnState(row, column, "start")}
                                    isEnd={returnState(row, column, "end")}
                                    isWall={returnState(row, column, "wall")}
                                    isVisited={grid[row][column].isVisited}
                                    isShortest={grid[row][column].isShortest}
                                    onClick={() => clickHandler(row, column)}
                                    onMouseMove={() => mouseMoveHandler(row, column)}
                                    onMouseLeave={() => setFieldTriggered(false)}
                                ></Node>
                                )
                            })}
                        </StyledRow>
                    )
                })}
            </StyledGrid>
        </>
    );
};