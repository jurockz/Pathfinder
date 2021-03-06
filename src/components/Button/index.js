import React from "react";

import { StyledButton, StyledColor } from "./styles"

// Ein wiederverwendbarer Button
export const Button = ({children, color, active, onClick, alone}) => {
    return (
        <>
            <StyledButton 
                active={active}
                onClick={onClick}
                alone={alone}
            >
                {color !== "transparent" ? <StyledColor color={color}></StyledColor> : ""}
                {children}
            </StyledButton>
        </>
    );
};
