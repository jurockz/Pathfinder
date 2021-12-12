import React from "react";

import "./styles.css";

// Eine "Cell" im Frontend stellt einen Knoten im Graphen wieder
export const Cell = ({
  extraClass,
  onClick,
  onMouseMove,
  onMouseLeave,
}) => {
  return (
    <>
      <div className="cell-wrapper">
        <div
          className={"cell " + extraClass}
          onClick={onClick}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        ></div>
      </div>
    </>
  );
};
