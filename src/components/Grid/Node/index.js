import React from "react";

import "./styles.css";

export const Node = ({
  extraClass,
  onClick,
  onMouseMove,
  onMouseLeave,
}) => {
  return (
    <>
      <div className="node-wrapper">
        <div
          className={"node " + extraClass}
          onClick={onClick}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        ></div>
      </div>
    </>
  );
};
