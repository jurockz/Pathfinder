import React, { useState, useEffect } from "react";

import { StyledGrid, StyledRow } from "./styles";
import { Node } from "./Node";
import _ from "lodash"

import { breadthFirstSearch, getShortestPath} from "./algorithms/BreadthFirstSearch";

export const Grid = ({ fieldSquare, gridWidth, gridHeight, activeButton, startAlgorithm }) => {
    const [isActiveStart, setActiveStart] = useState(null);
    const [isActiveEnd, setActiveEnd] = useState(null);
    const [isActiveWall, setActiveWall] = useState([]);
    const [isMouseDown, setMouseDown] = useState(false);
    const [isFieldTriggered, setFieldTriggered] = useState(false);
    // useEffect(() => {

    //   }, [])

    //GRID------------------START---------------------------------------------------------------

    const initializeGrid = () => {
        let grid = [];
        for(let row = 0; row < gridHeight; row++) {
            let gridRow = [];
            for(let col = 0; col < gridWidth; col++) {
                gridRow.push(createVertex(row, col));
            }
            grid.push(gridRow);
        }
        return addEdges(grid);
    }

    const createVertex = (row, col) => {
        return {
            coordinates: {row, col},
            isStart: false,
            isFinish: false,
            isVisited: false,
            isShortest: false,
            isWall: false,
            shortest: null,
            edges: [],
        }
    }

    const isInGrid = (row, col) => {
        return (row >= 0 && col >= 0) && (row < gridHeight && col < gridWidth);
    }

    const addEdges = (grid) => {
        for(let row = 0; row < gridHeight; row++) {
            for(let col = 0; col < gridWidth; col++) {
                if(isInGrid(row, col-1)) grid[row][col].edges.push(grid[row][col-1]); // left
                if(isInGrid(row, col+1)) grid[row][col].edges.push(grid[row][col+1]); // right
                if(isInGrid(row-1, col)) grid[row][col].edges.push(grid[row-1][col]); // up
                if(isInGrid(row+1, col)) grid[row][col].edges.push(grid[row+1][col]); // down
            }
        }
        return grid;
    }

    const [isGrid, setGrid] = useState(initializeGrid());

    const toggleStateGrid = (row, col, state) => {
        const temp = [...isGrid];
        temp[row][col][state] = !temp[row][col][state];
        setGrid(temp);
    }

    //GRID-----------------------END------------------------------------------------------------

    //Pathfinding------------------START--------------------------------------------------------

    const [isAnimationIndex, setAnimationIndex] = useState(0);
    const [isAnimationStarted, setAnimationStarted] = useState(false);
    const [isShortestPath, setShortestPath] = useState(null);
    const [isVisitedVertices, setVisitedVertices] = useState(null);

    const animateAlgorithm = (visitedVertices, shortestPath) => {
    //     setAnimationIndex(0);
    //     var interval = setTimeout(function(){
    //         debugger;
    //         // const copy = _.cloneDeep(isGrid);
    //         // copy[visitedVertices[index].coordinates.row][visitedVertices[index].coordinates.col].isVisited = true;
    //         // setGrid(copy);
    //         let temp = isAnimationIndex +1;
    //         setAnimationIndex(temp);
    //         if(isAnimationIndex === visitedVertices.length){
    //             clearInterval(interval);
    //         }
    //    }, 1000)
    }


    const BFS = () => {
        const copy = _.cloneDeep(isGrid);
        setShortestPath(breadthFirstSearch(copy, isActiveStart, isActiveEnd))
        setVisitedVertices(getShortestPath(copy[isActiveEnd.row][isActiveEnd.column]))
    }

    useEffect(() => {
        if(startAlgorithm) {
            const ret = BFS();
            // var interval = null;
            // const ret = BFS();
            // var visitedVertices = ret[0];
            // var shortestPath = ret[1];
            // interval = setInterval(() => {
            //     setAnimationIndex((temp) => {
            //         if(temp === visitedVertices.length) {
            //             console.log("end of visited");
            //             clearInterval(interval);
            //         }
            //         debugger;
            //         // const copy = _.cloneDeep(isGrid);
            //         // copy[visitedVertices[isAnimationIndex].coordinates.row][visitedVertices[isAnimationIndex].coordinates.col].isVisited = true;
            //         // setGrid(copy);
            //         return temp +1;
            //     });
            // },1000)
            // return () =>{if(interval !== null) clearInterval(interval);}
            console.log(isShortestPath);
            debugger;
            const counterInterval = setInterval(function () {
                debugger;
                setAnimationIndex((prev) => {
                    debugger;
                    console.log(prev);
                    // const copy = _.cloneDeep(isGrid);
                    // copy[1][1].isVisited = !copy[1][1].isVisited
                    // setGrid(copy);
                    return prev + 1;
                });
            }, 1000);
            return () => clearInterval(counterInterval);

        }
    }, [startAlgorithm, isShortestPath])

    //Pathfinding------------------END----------------------------------------------------------

    const clickHandler = (row, column) => {
        // Start and end not at the same position 
        if((isActiveStart?.row === row && isActiveStart?.column === column) ||
            (isActiveEnd?.row === row && isActiveEnd?.column === column)) {
                return;
        }
        // Start and end not on wall
        if(isActiveWall.findIndex(x => x.row === row && x.column === column) > -1) {
            removeFromWall(row,column)
            toggleStateGrid(row,column, "isWall");
        }
        // Set start or end 
        const coordinates = {row: row, column: column};
        if(activeButton === "start") {
            if(isActiveStart) {
                toggleStateGrid(isActiveStart.row,isActiveStart.column, "isStart");    
            }
            setActiveStart(coordinates);
            toggleStateGrid(row,column, "isStart");
        } else if(activeButton === "end") {
            if(isActiveEnd) {
                toggleStateGrid(isActiveEnd.row,isActiveEnd.column, "isEnd");
            }
            setActiveEnd(coordinates);
            toggleStateGrid(row,column, "isEnd");
        }
    }

    const mouseMoveHandler = (row, column) => {
        if(isMouseDown && !isFieldTriggered && activeButton === "wall") {
            if((isActiveStart?.row === row && isActiveStart?.column === column) ||
                (isActiveEnd?.row === row && isActiveEnd?.column === column)) {
                    return;
            }
            if(isActiveWall.findIndex(x => x.row === row && x.column === column) > -1) {
                removeFromWall(row, column)
            } else {
                addToWall(row,column)
            }
            toggleStateGrid(row,column, "isWall");
            setFieldTriggered(true);
        }
    }

    const removeFromWall = (row, column) => {
        const temp = [...isActiveWall];
        const index = temp.findIndex(x => x.row === row && x.column === column)
        temp.splice(index, 1);
        setActiveWall(temp);
    }

    const addToWall = (row, column) => {
        const temp = [...isActiveWall];
        const coordinates = {row: row, column: column};
        temp.push(coordinates)
        setActiveWall(temp);
    }

    const returnState = (row, column, state) => {
        if(isActiveStart?.row === row && isActiveStart?.column === column && state === "start") {
            return true;
        } else if(isActiveEnd?.row === row && isActiveEnd?.column === column && state === "end") {
            return true;
        } else if(isActiveWall.findIndex(x => x.row === row && x.column === column) > -1 && state === "wall") {
            return true;
        } else if(state === "undefined") {
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
                {isGrid.map((rowItem, row) => {
                    return (
                        <StyledRow>
                            {rowItem.map((y, column) => {
                                return (
                                <Node
                                    fieldSquare={fieldSquare}
                                    isStart={returnState(row, column, "start")}
                                    isEnd={returnState(row, column, "end")}
                                    isWall={returnState(row, column, "wall")}
                                    isUndefined={returnState(row, column, "undefined")}
                                    isVisited={isGrid[row][column].isVisited}
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