import React from "react";

import { StyledButton, StyledColor } from "./styles"

export const Button = ({children, color, active, onClick}) => {
    return (
        <>
            <StyledButton 
                active={active}
                onClick={onClick}
            >
                <StyledColor color={color}></StyledColor>
                {children}
            </StyledButton>
        </>
    );
};
