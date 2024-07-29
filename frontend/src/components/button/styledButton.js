import React from "react";
import styled from "styled-components";

function StyledButton({name, icon, onClick, bg, bPadding, color, bRadius}) {
    return (
        <ButtonStyled style={{
            background: bg,
            padding: bPadding,
            borderRadius: bRadius,
            color: color,
        }} onClick={onClick}>
            {icon}
            {name}
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;
`;

export default StyledButton;