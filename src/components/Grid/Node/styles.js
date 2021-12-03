import styled, { keyframes } from "styled-components";

const resize = () => keyframes`
    from {
        width: 20px;
        height: 20px;
    }

    to {
        width: 40px;
        height: 40px;
    }
`;

export const StyledInnerNode = styled.div`
  animation-name: ${(props) =>
    props.isShortest ||
    props.isVisited ||
    props.isStart ||
    props.isEnd ||
    props.isWall ||
    (props.isVisited && props.isShortest) // animation for isShortest!
      ? resize
      : ""};
  animation-duration: 1s;
  animation-timing-function: linear;
  width: ${(props) => props.fieldSquare}px;
  height: ${(props) => props.fieldSquare}px;
  transition: all 1s;
  background-color: ${(props) =>
    props.isStart
      ? "yellow"
      : props.isEnd
      ? "red"
      : props.isShortest
      ? "blue"
      : props.isVisited
      ? "green"
      : props.isWall
      ? "black"
      : "lightgrey"};
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
