import styled from "styled-components";

export const StyledButton = styled.div`
    margin: 5px;
    padding: 5px;
    font-size: 15px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: .5s;
    cursor: pointer;
    border-radius: 10px;
    background-color: ${(props) => props.active === null || props.active === false ? "rgba(0, 0, 0, .1)" : "white"};
    border: 1px solid ${(props) => props.active === null || props.active === false ? "transparent" : "grey"};
    &:hover {
        background-color: ${(props) => props.active == null ? "rgba(0, 0, 0, .2)" : ""};;
    }
`;

export const StyledColor = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin-right: 5px;
`;