import styled, { keyframes } from "styled-components";

const resize = (fieldSquare) => keyframes`
    from {
        width: ${fieldSquare/2}px;
        height: ${fieldSquare/2}px;
    }

    to {
        width: ${fieldSquare}px;
        height: ${fieldSquare}px;
    }
`;

export const StyledInnerNode = styled.div`
    animation: ${(props) => props.isStart || 
                            props.isEnd || 
                            props.isWall || 
                            (!props.isStart && !props.isEnd && !props.isWall) ? 
                            resize(props.fieldSquare) : ""} 
                            1s linear;
    animation: ${(props) => props.isVisited ? 
                            resize(props.fieldSquare) : ""} 
                            1s linear;
    width: ${(props) => props.fieldSquare}px;
    height: ${(props) => props.fieldSquare}px;
    transition: all 1s;
    background-color: ${(props) => props.isStart ? "yellow" : props.isEnd ? "red" : props.isShortest ? "blue" : props.isVisited ? "green" : props.isWall ? "black" : "lightgrey"};
    cursor: pointer;
`;

export const StyledNode = styled.div`
    width: ${(props) => props.fieldSquare}px;
    height: ${(props) => props.fieldSquare}px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1px;
`;