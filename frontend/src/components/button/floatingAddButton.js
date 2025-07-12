import React from "react";
import styled from "styled-components";
import { plus } from "../../utils/icons";

function FloatingAddButton({ onClick }) {
    return (
        <FloatingButtonStyled onClick={onClick}>
            {plus}
        </FloatingButtonStyled>
    );
}

const FloatingButtonStyled = styled.button`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--color-accent);
    border: none;
    cursor: pointer;
    box-shadow: 0px 8px 25px rgba(200, 119, 247, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0px 12px 35px rgba(200, 119, 247, 0.4);
        background: var(--color-green);
    }

    &:active {
        transform: translateY(0);
    }

    i, svg {
        font-size: 1.5rem;
        color: white;
    }

    @media screen and (max-width: 768px) {
        bottom: 1.5rem;
        right: 1.5rem;
        width: 56px;
        height: 56px;
    }
`;

export default FloatingAddButton;