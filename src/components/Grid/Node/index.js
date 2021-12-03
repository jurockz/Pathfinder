import React from "react";

import { StyledNode, StyledInnerNode } from "./styles"

export const Node = ({ fieldSquare, isStart, isEnd, isWall, isShortest, isVisited, onClick, onMouseMove, onMouseLeave }) => {
    return (
        <>
            <StyledNode
                fieldSquare={fieldSquare}
            >
                <StyledInnerNode
                    fieldSquare={fieldSquare}
                    isStart={isStart}
                    isEnd={isEnd}
                    isWall={isWall}
                    isShortest={isShortest}
                    isVisited={isVisited}
                    onClick={onClick}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                ></StyledInnerNode>
            </StyledNode>
        </>
    );
};