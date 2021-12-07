import styled from "styled-components";

export const StyledButton = styled.div`
    ${(props) => props.alone ? "min-width: 80px;": ""}
    margin: 5px;
    padding: 5px;
    font-size: 15px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: .5s;
    cursor: pointer;
    border-radius: 10px;
    background-color: ${(props) => props.active === null || props.active === false ? "#c0c0c0" : "#e5e9f1"};
    &:hover {
        background-color: ${(props) => props.active == null || props.active === false ? "#dfdfdf" : ""};;
    }
`;

export const StyledColor = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin-right: 5px;
`;